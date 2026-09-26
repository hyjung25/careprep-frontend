'use strict';
const $ = id => document.getElementById(id);
const strings = {
  en: {
    prototype:'CLASS PROJECT', language:'Language', eyebrow:'A LITTLE MORE PREPARED', heading:'Your words. A clearer next conversation.',
    intro:'Describe how you feel, explore trusted information, and bring your notes to a healthcare visit.', step1:'01 / TALK IT THROUGH', chatTitle:'How are you feeling?', clear:'Clear conversation',
    privacy:'Messages are sent to our backend and OpenAI. Avoid names, contact details, or other identifying information. Conversation history stays in this tab’s memory; the provider may retain requests under its policies.',
    welcome:'Start wherever you are.', welcomeText:'I’ll help you put your symptoms into words and ask a few follow-up questions. I can’t diagnose or recommend medication.',
    scope:'Resource topics: headache, cough, and abdominal pain.', loading:'Preparing a response…', messageLabel:'In your own words', placeholder:'What’s been bothering you?', send:'Send message ↗',
    memory:'Only the latest 12 messages are kept. Refreshing or clearing removes your conversation.', step2:'02 / BRING IT WITH YOU', summaryTitle:'Your visit notes',
    summaryIntro:'A simple summary of what you’ve shared, with the missing details made clear.', preview1:'Your main concern', preview2:'Timing, severity & changes', preview3:'Questions for your clinician',
    generate:'Generate visit summary', review:'Review these notes before sharing. Quotes keep your original wording and language.', copy:'Copy summary',
    grounded:'GROUNDED IN PUBLIC RESOURCES', sourcesTitle:'Sources for this reply', noSources:'Relevant resources will appear here when available.',
    attribution:'Source: MedlinePlus, National Library of Medicine. Korean passages are project translations, not official translations.',
    limitTitle:'Preparation, with perspective.', limitText:'This is an educational prototype, not a diagnostic service or a validated triage tool. If you may be in immediate danger, contact local emergency services. Don’t wait for a chat response.',
    settings:'Connection settings', settingsText:'Use only a backend you trust. Your messages will be sent to the address below. The address is not saved after refresh.', backendLabel:'Backend URL', connect:'Apply & check', footer:'Made for a more thoughtful healthcare conversation.',
    examples:['I’ve had a headache since yesterday.','My cough keeps coming back.','My stomach has been bothering me.'], user:'YOU · USER-REPORTED', assistant:'CAREPREP',
    empty:'Please enter a message.', missing:'The backend is not connected yet. Set its URL in Connection settings below.', invalidURL:'Use an HTTPS backend URL, or HTTP localhost for development. Do not include passwords, query strings, or fragments.',
    failed:'Could not reach the backend. Check the connection settings and try again. Your draft is still here.', timeout:'The request timed out. The backend may be waking up; wait a moment and try again.',
    provider_not_configured:'The backend is reachable, but its OpenAI API key has not been configured. Ask the project owner to complete setup.',
    provider_failed:'The AI provider could not complete this request. Please try again shortly.', invalid_provider_output:'The AI response could not be verified. Please try again.',
    provider_timeout:'The AI provider took too long. Please try again shortly.', rate_limited:'Too many requests. Please wait one minute before trying again.', provider_rate_limited:'The AI provider is rate limited. Wait one minute and try again.', daily_limit:'The project’s daily request limit has been reached. Please try another day.',
    invalid_input:'The request is invalid or too long. Use 1–1200 characters and try again.', request_too_large:'The request is too large. Clear the conversation and try a shorter message.',
    copied:'Copied to clipboard.', copyFailed:'Copy was blocked. Select the summary text and copy it manually.', connected:'Backend connected. API key is configured; this does not verify provider access.', notReady:'Backend connected. The OpenAI API key still needs to be configured.', checked:'Retrieved', pending:'Checking connection…', trimmed:'Earlier messages were removed to keep context bounded.', fixture:'DEVELOPMENT FIXTURE · simulated AI, not a live provider response'
  },
  ko: {
    prototype:'수업 프로젝트', language:'언어', eyebrow:'진료를 위한 작은 준비', heading:'내 말로 설명하고, 더 명확하게 상담하세요.',
    intro:'어떤 증상이 있는지 이야기하고, 신뢰할 수 있는 정보를 살펴보고, 진료 때 가져갈 메모를 준비하세요.', step1:'01 / 이야기 나누기', chatTitle:'어디가 불편하신가요?', clear:'대화 지우기',
    privacy:'메시지는 백엔드와 OpenAI로 전송됩니다. 이름, 연락처 등 개인 식별 정보는 입력하지 마세요. 대화는 이 탭의 메모리에만 보관되지만, 제공업체 정책에 따라 요청이 보관될 수 있습니다.',
    welcome:'편하게 이야기해 주세요.', welcomeText:'증상을 말로 정리하고 몇 가지 추가 질문을 드릴게요. 진단이나 약 추천은 할 수 없습니다.', scope:'자료 주제: 두통, 기침, 복통.',
    loading:'응답을 준비하고 있어요…', messageLabel:'본인의 말로 설명해 주세요', placeholder:'어떤 점이 불편하신가요?', send:'메시지 보내기 ↗', memory:'최근 메시지 12개만 보관합니다. 새로고침하거나 지우면 대화가 사라집니다.',
    step2:'02 / 진료 때 가져가기', summaryTitle:'나의 진료 메모', summaryIntro:'말씀하신 내용을 간단히 요약하고, 아직 확인하지 못한 정보를 표시합니다.', preview1:'주요 증상', preview2:'시작 시점, 정도와 변화', preview3:'의료진에게 할 질문',
    generate:'진료 요약 만들기', review:'공유하기 전에 내용을 확인하세요. 인용문은 입력한 표현과 언어를 유지합니다.', copy:'요약 복사', grounded:'공공 보건 자료 기반', sourcesTitle:'이번 답변의 출처', noSources:'관련 자료가 있으면 여기에 표시됩니다.',
    attribution:'출처: MedlinePlus, 미국 국립의학도서관. 한국어 문구는 프로젝트 번역이며 공식 번역이 아닙니다.', limitTitle:'진료 준비를 위한 도구입니다.', limitText:'교육용 프로토타입으로, 진단 서비스나 검증된 응급도 판단 도구가 아닙니다. 즉각적인 위험이 의심되면 현지 응급 서비스에 연락하세요. 답변을 기다리지 마세요.',
    settings:'연결 설정', settingsText:'신뢰하는 백엔드만 사용하세요. 메시지는 아래 주소로 전송됩니다. 새로고침하면 주소 설정이 초기화됩니다.', backendLabel:'백엔드 URL', connect:'적용 및 확인', footer:'더 나은 진료 대화를 위해 만들었습니다.',
    examples:['어제부터 두통이 있어요.','기침이 자꾸 나요.','배가 계속 불편해요.'], user:'나 · 사용자 진술', assistant:'CAREPREP', empty:'메시지를 입력하세요.', missing:'백엔드가 아직 연결되지 않았습니다. 아래 연결 설정에서 URL을 입력하세요.', invalidURL:'HTTPS 주소 또는 개발용 HTTP localhost를 사용하세요. 비밀번호, 쿼리, 프래그먼트는 포함하지 마세요.',
    failed:'백엔드에 연결할 수 없습니다. 연결 설정을 확인한 뒤 다시 시도하세요. 입력한 내용은 남아 있습니다.', timeout:'요청 시간이 초과되었습니다. 서버가 시작 중일 수 있으니 잠시 후 다시 시도하세요.',
    provider_not_configured:'백엔드는 연결되었지만 OpenAI API 키가 설정되지 않았습니다. 프로젝트 관리자에게 설정을 요청하세요.', provider_failed:'AI 제공업체가 요청을 처리하지 못했습니다. 잠시 후 다시 시도하세요.', invalid_provider_output:'AI 응답을 확인할 수 없습니다. 다시 시도하세요.', provider_timeout:'AI 제공업체의 응답 시간이 초과되었습니다. 다시 시도하세요.',
    rate_limited:'요청이 너무 많습니다. 1분 후 다시 시도하세요.', provider_rate_limited:'AI 제공업체의 요청 한도에 도달했습니다. 1분 후 다시 시도하세요.', daily_limit:'프로젝트의 일일 요청 한도에 도달했습니다. 다른 날 다시 시도하세요.', invalid_input:'요청이 올바르지 않거나 너무 깁니다. 1–1200자로 입력하세요.', request_too_large:'요청이 너무 큽니다. 대화를 지운 뒤 더 짧게 입력하세요.',
    copied:'클립보드에 복사했습니다.', copyFailed:'복사가 차단되었습니다. 요약문을 선택해 직접 복사하세요.', connected:'백엔드가 연결되었습니다. API 키가 설정되어 있지만 제공업체 연결을 확인한 것은 아닙니다.', notReady:'백엔드가 연결되었습니다. OpenAI API 키를 설정해야 합니다.', checked:'자료 확인', pending:'연결 확인 중…', trimmed:'대화 길이 제한으로 이전 메시지를 지웠습니다.', fixture:'개발 테스트 응답 · 실제 AI 제공업체의 응답이 아닙니다'
  }
};
let language = 'en', history = [], busy = false, controller = null, generation = 0;
let backendUrl = window.CAREPREP_CONFIG?.backendUrl || '';
const t = key => strings[language][key] || strings[language].failed;
function setLanguage() {
  language = $('language').value;
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-placeholder]').forEach(el => { el.placeholder = t(el.dataset.placeholder); });
  document.querySelectorAll('[data-example]').forEach(el => { el.textContent = t('examples')[Number(el.dataset.example)]; });
  $('messages').setAttribute('aria-label', language === 'ko' ? '대화' : 'Conversation');
  $('error').hidden = true;
  $('copy-status').textContent = '';
}
function setBusy(value) {
  busy = value;
  $('loading').hidden = !value;
  $('send').disabled = value;
  $('generate').disabled = value || !history.some(m => m.role === 'user');
  $('language').disabled = value;
  $('message').disabled = value;
  $('connect').disabled = value;
  $('backend-url').disabled = value;
  document.querySelectorAll('[data-example]').forEach(el => { el.disabled = value; });
  $('chat-form').setAttribute('aria-busy', String(value));
}
function showError(message) { $('error').textContent = message; $('error').hidden = false; }
function validateUrl(value) {
  if (!value.trim()) throw new Error(t('missing'));
  let url;
  try { url = new URL(value.trim()); } catch { throw new Error(t('invalidURL')); }
  const local = ['localhost','127.0.0.1','[::1]'].includes(url.hostname);
  if (!(url.protocol === 'https:' || (local && url.protocol === 'http:')) || url.username || url.password || url.search || url.hash) throw new Error(t('invalidURL'));
  return url.href.replace(/\/$/, '');
}
async function api(path, payload, signal) {
  const root = validateUrl(backendUrl);
  const response = await fetch(root + path, {method:payload ? 'POST':'GET', cache:'no-store', credentials:'omit', referrerPolicy:'no-referrer',
    headers:payload ? {'Content-Type':'application/json'} : {}, body:payload ? JSON.stringify(payload):undefined, signal});
  let data;
  try { data = await response.json(); } catch { throw new Error(t('failed')); }
  if (!response.ok) throw new Error(t(data.detail?.code || (response.status === 429 ? 'rate_limited':'provider_failed')));
  return data;
}
function addMessage(role, text, urgent = false) {
  $('welcome').hidden = true;
  const message = document.createElement('article');
  message.className = 'message ' + role + (urgent ? ' urgent' : '');
  const label = document.createElement('span'); label.className = 'speaker'; label.textContent = t(role);
  const body = document.createElement('div'); body.className = 'body'; body.textContent = text;
  message.append(label, body); $('messages').append(message);
  // DOM retention and sent context are both bounded.
  while ($('messages').querySelectorAll('.message').length > 12) $('messages').querySelector('.message').remove();
  $('messages').scrollTop = $('messages').scrollHeight;
}
function showSources(sources) {
  $('sources').replaceChildren();
  if (!sources.length) { const p = document.createElement('p'); p.className = 'muted'; p.textContent = t('noSources'); $('sources').append(p); }
  sources.forEach(s => {
    let url; try { url = new URL(s.url); } catch { return; }
    if (url.protocol !== 'https:' || url.hostname !== 'medlineplus.gov' || url.username || url.password) return;
    const card = document.createElement('div'); card.className = 'source';
    const a = document.createElement('a'); a.href = url.href; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.textContent = '[' + s.id + '] ' + s.title + ' ↗';
    const detail = document.createElement('small'); detail.textContent = url.href + '\n' + t('checked') + ': ' + s.retrieved_at;
    card.append(a, detail); $('sources').append(card);
  });
}
function resetSummary() { $('summary-text').textContent = ''; $('summary-result').hidden = true; $('copy-status').textContent = ''; }
async function run(task) {
  if (busy) return;
  const version = generation;
  const active = new AbortController(); controller = active;
  const timeout = setTimeout(() => active.abort('timeout'), 45000);
  $('error').hidden = true; setBusy(true);
  try { await task(active.signal, () => generation === version); }
  catch (error) {
    if (generation === version) showError(active.signal.aborted ? t('timeout') : (error instanceof TypeError ? t('failed') : error.message));
  } finally {
    clearTimeout(timeout);
    if (generation === version) { controller = null; setBusy(false); }
  }
}
$('chat-form').addEventListener('submit', event => {
  event.preventDefault(); if (busy) return;
  const message = $('message').value.trim();
  if (!message) { showError(t('empty')); return; }
  run(async (signal, current) => {
    const data = await api('/api/chat', {message, history, language}, signal);
    if (!current()) return;
    if (typeof data.response !== 'string' || !Array.isArray(data.sources)) throw new Error(t('failed'));
    addMessage('user', message); addMessage('assistant', (data.development_fixture ? t('fixture') + '\n\n' : '') + data.response, data.urgent);
    // The app's maximum assistant response is below this bound; preserve full turns.
    history.push({role:'user',content:message}, {role:'assistant',content:data.response.slice(0,1200)});
    history = history.slice(-12); showSources(data.sources); resetSummary();
    $('message').value = ''; $('counter').textContent = '0 / 1200';
  });
});
$('message').addEventListener('input', () => { $('counter').textContent = $('message').value.length + ' / 1200'; });
$('message').addEventListener('keydown', event => {
  if (event.key === 'Enter' && (event.ctrlKey || event.metaKey) && !event.isComposing) { event.preventDefault(); $('chat-form').requestSubmit(); }
});
document.querySelectorAll('[data-example]').forEach(button => button.addEventListener('click', () => {
  $('message').value = button.textContent; $('message').dispatchEvent(new Event('input')); $('message').focus();
}));
$('generate').addEventListener('click', () => run(async (signal, current) => {
  const data = await api('/api/summary', {history, language}, signal);
  if (!current()) return;
  if (typeof data.summary !== 'string') throw new Error(t('failed'));
  $('summary-text').textContent = (data.development_fixture ? t('fixture') + '\n\n' : '') + data.summary;
  $('summary-result').hidden = false; $('copy-status').textContent = '';
}));
$('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText($('summary-text').textContent); $('copy-status').textContent = t('copied'); }
  catch { $('copy-status').textContent = t('copyFailed'); }
});
$('clear').addEventListener('click', () => {
  generation++; controller?.abort(); controller = null; history = [];
  $('messages').querySelectorAll('.message').forEach(el => el.remove());
  $('welcome').hidden = false; $('error').hidden = true; $('message').value = ''; $('counter').textContent = '0 / 1200';
  resetSummary(); showSources([]); setBusy(false); $('message').focus();
});
$('connect').addEventListener('click', () => {
  if (busy) return;
  let next;
  try { next = validateUrl($('backend-url').value); } catch (error) { showError(error.message); return; }
  // A new endpoint must not receive a conversation intended for an old one.
  if (next !== backendUrl) $('clear').click();
  backendUrl = next;
  run(async (signal, current) => {
    $('connection-status').textContent = t('pending');
    try {
      const data = await api('/health', null, signal);
      if (!current()) return;
      $('connection-status').textContent = data.development_fixture ? t('fixture') : t(data.provider_configured ? 'connected':'notReady');
    } catch (error) { $('connection-status').textContent = ''; throw error; }
  });
});
$('language').addEventListener('change', setLanguage);
$('backend-url').value = backendUrl;
setLanguage();
if (!backendUrl) $('connection-status').textContent = t('missing');
