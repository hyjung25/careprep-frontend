"""Synthetic UI checks against real local FastAPI routes and a LABELED provider fixture.
Requires Python 3.12 + pip install playwright; uses installed Google Chrome.
Start production backend :8000, tests.fixture_server :8001, frontend :5500.
Run from this repo: ../careprep-backend/.venv/bin/python test_browser.py
Never use real patient information in these tests.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    page = browser.new_page(viewport={'width':1280,'height':1000})
    errors = []
    page.on('pageerror', lambda err: errors.append(str(err)))
    page.goto('http://127.0.0.1:5500')
    expect(page.get_by_role('heading',name='How are you feeling?')).to_be_visible()
    expect(page.get_by_role('button',name='Generate visit summary')).to_be_disabled()
    page.screenshot(path='test-results/welcome.png',full_page=True)
    # Whitespace and actual missing-key backend failure preserve draft.
    page.get_by_label('In your own words').fill('   ')
    page.get_by_role('button',name='Send message').click()
    expect(page.get_by_role('alert')).to_contain_text('Please enter')
    page.get_by_label('In your own words').fill('I have a headache since yesterday.')
    page.get_by_role('button',name='Send message').click()
    expect(page.get_by_role('alert')).to_contain_text('API key has not been configured')
    expect(page.get_by_label('In your own words')).to_have_value('I have a headache since yesterday.')
    # Health and real CORS across ports.
    page.get_by_text('Connection settings',exact=True).click()
    page.get_by_role('button',name='Apply & check').click()
    expect(page.locator('#connection-status')).to_contain_text('API key still needs')
    page.get_by_label('Backend URL').fill('http://127.0.0.1:8001')
    page.get_by_role('button',name='Apply & check').click()
    expect(page.locator('#connection-status')).to_contain_text('DEVELOPMENT FIXTURE')
    # Successful actual HTTP communication, selections simulated by fixture.
    page.get_by_label('In your own words').fill('I have a headache since yesterday.')
    page.get_by_role('button',name='Send message').click()
    expect(page.locator('#messages')).to_contain_text('How strong does it feel')
    expect(page.locator('#messages')).to_contain_text('DEVELOPMENT FIXTURE')
    expect(page.get_by_role('link',name='[headache] Headache')).to_have_attribute('href','https://medlineplus.gov/headache.html')
    page.get_by_label('In your own words').fill('It is mild and has stayed the same.')
    page.get_by_role('button',name='Send message').click()
    expect(page.locator('#messages')).to_contain_text('Have you noticed any other symptoms?')
    page.get_by_role('button',name='Generate visit summary').click()
    expect(page.locator('#summary-text')).to_contain_text('I have a headache since yesterday.')
    expect(page.locator('#summary-text')).to_contain_text('Not provided')
    page.context.grant_permissions(['clipboard-read','clipboard-write'])
    page.get_by_role('button',name='Copy summary').click()
    expect(page.locator('#copy-status')).to_have_text('Copied to clipboard.')
    assert page.evaluate('navigator.clipboard.readText()') == page.locator('#summary-text').text_content()
    page.screenshot(path='test-results/chat-summary.png',full_page=True)
    # Output remains text, not HTML; a new turn invalidates stale summary.
    page.get_by_label('In your own words').fill('<img src=x onerror="alert(1)"> headache')
    page.get_by_role('button',name='Send message').click()
    expect(page.locator('#messages')).to_contain_text('<img src=x')
    assert page.locator('#messages img').count() == 0
    expect(page.locator('#summary-result')).to_be_hidden()
    for text, expected in [('TEST_ERROR','could not complete'),('TEST_RATE','Too many requests'),('TEST_TIMEOUT','took too long')]:
        page.get_by_label('In your own words').fill(text)
        page.get_by_role('button',name='Send message').click()
        expect(page.get_by_role('alert')).to_contain_text(expected)
        expect(page.get_by_label('In your own words')).to_have_value(text)
    # Clear aborts in-flight request and discards late response.
    page.get_by_label('In your own words').fill('TEST_DELAY')
    page.get_by_role('button',name='Send message').click()
    expect(page.get_by_role('button',name='Send message')).to_be_disabled()
    page.get_by_role('button',name='Clear conversation').click()
    expect(page.get_by_role('heading',name='Start wherever you are.')).to_be_visible()
    page.wait_for_timeout(3300)  # Explicit fixture delay, proving late result is discarded.
    assert page.locator('.message').count() == 0
    # Korean conversation and emergency routing use real backend logic.
    page.get_by_label('Language').select_option('ko')
    page.get_by_label('본인의 말로 설명해 주세요').fill('어제부터 두통이 있어요.')
    page.get_by_role('button',name='메시지 보내기').click()
    expect(page.locator('#messages')).to_contain_text('일반적인 정보')
    page.get_by_role('button',name='대화 지우기').click()
    page.get_by_label('본인의 말로 설명해 주세요').fill('숨을 못 쉬겠어요')
    page.get_by_role('button',name='메시지 보내기').click()
    expect(page.locator('.urgent')).to_contain_text('현지 응급 서비스')
    assert '119' not in page.locator('.urgent').text_content()
    page.set_viewport_size({'width':390,'height':844})
    assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth')
    page.screenshot(path='test-results/mobile-korean.png',full_page=True)
    assert page.evaluate('localStorage.length') == 0
    page.reload()
    expect(page.get_by_role('heading',name='Start wherever you are.')).to_be_visible()
    # Frontend timeout independent of provider, with simulated hanging HTTP response.
    pending_routes = []
    page.route('**/api/chat', lambda route: pending_routes.append(route))
    page.get_by_label('In your own words').fill('headache')
    page.get_by_role('button',name='Send message').click()
    expect(page.get_by_role('alert')).to_contain_text('timed out',timeout=48000)
    expect(page.get_by_role('button',name='Send message')).to_be_enabled()
    for route in pending_routes:
        route.abort('timedout')
    page.unroute_all(behavior='wait')
    assert not errors, errors
    browser.close()
print('PASS: synthetic browser flows, live local HTTP/CORS, labeled AI fixture, privacy, timeout, mobile and Korean.')
