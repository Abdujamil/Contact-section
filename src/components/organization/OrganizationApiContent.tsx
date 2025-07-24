"use client";
import styles from "@/app/page.module.scss";
import React, {useRef, useState} from "react";

export default function OrganizationApiContent() {
    const preRef = useRef<HTMLPreElement>(null);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!preRef.current) return;

        const textToCopy = preRef.current.innerText;

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Уведомление исчезает через 2 секунды
            })
            .catch(err => {
                console.error("Ошибка копирования:", err);
            });
    };

    return (
        <div>
            {/* Всплывающее уведомление */}
            {copied && (
                <div
                    className={`fixed bottom-[60px] right-[50px] z-[999] flex items-center gap-3 px-5 py-3 rounded-lg
                text-sm text-[#ccc] shadow-lg backdrop-blur-md bg-white/10
                transition-opacity duration-300 animate-fadeInOutRight`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-green-400 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Скопировано</span>
                </div>
            )}

            <div
                className={`${styles.BlogPageContent} mb-[40px] text-[18px] leading-relaxed whitespace-pre-line p-[30px] border border-[#353535] rounded-[6px]`}
            >
                <div className="oferta-content policy-content">
                    <section id="introduction">
                        <h2>Введение</h2>

                        <p>
                            Документ описывает возможности REST API для системы преобразования аудио-записей в текст
                            путём
                            отправки запросов через Internet. Эта инструкция поможет вам подключиться к API AudioSector
                            и
                            автоматически расшифровывать аудиофайлы в текст. Подходит для разработчиков, интеграторов,
                            создателей CRM-систем, маркетплейсов и других сервисов.
                        </p>
                    </section>
                    <section id="workflow">
                        <h2>Порядок работы</h2>

                        <h3>Получение токена авторизации</h3>
                        <p>Для начала работы необходимо зарегистрироваться на сайте https://audiosector.ru Затем в
                            личном кабинете (ЛК) зайти в профиль и получить API-токен для авторизации запросов. Токен
                            необходимо скопировать и сохранить. Просмотреть повторно его невозможно, с целью
                            безопасности он не сохраняется в системе, можно только повторно сгенерировать новый.</p>

                        <h3>Авторизация при запросах</h3>
                        <p>Токен должен быть указан в каждом запросе в виде заголовка «api_key:».</p>

                        <h3>
                            Пополнение баланса
                        </h3>
                        <p>Пополнить баланс вы можете в ЛК. Списание по заказам происходит с лицевого счета
                            аккаунта.</p>

                        <h3>Ограничения</h3>
                        <p>
                            Максимальный размер файла для обработки: 5000 МБ.
                        </p>
                    </section>
                    <section id="base-url">
                        <h2>Базовый URL — https://rest.audiosector.ru/v1</h2>
                    </section>
                    <section id="endpoints" className="!mb-0">
                        <h2>Эндпоинты</h2>

                        <h3>Общие коды возвращаемых ошибок</h3>
                        <p>
                            HTTP_422 – Ошибка валидации параметров (некорректные значения или не полный набор)
                        </p>
                        <p>
                            HTTP_401 – Ошибка авторизации
                        </p>
                        <p>
                            HTTP_402 – Ошибка: недостаточная сумма на лицевом счету
                        </p>
                        <p>
                            HTTP_500 – Внутренняя ошибка сервера
                        </p>

                        <h3>Передать файл на обработку</h3>
                        <div
                            className="p-5 border border-[#353535] rounded-[6px] bg-transparent text-sm text-[#ccc] !overflow-x-auto my-5">
  <pre>
    {`POST /task/file`}
  </pre>
                        </div>

                        {/* Блок пример */}
                        <div className={`w-full flex items-start justify-between`}>
                            <h3>Пример</h3>
                            <span onClick={handleCopy}
                                  className={`flex items-center gap-2.5 font-[Rubik] text-[14px] cursor-pointer`}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M4.40039 7.59801C4.40039 5.78068 4.40039 4.87201 4.96239 4.30734C5.52506 3.74268 6.42972 3.74268 8.24039 3.74268H10.1604C11.9704 3.74268 12.8757 3.74268 13.4377 4.30734C14.0004 4.87201 14.0004 5.78068 14.0004 7.59801V10.8113C14.0004 12.6287 14.0004 13.5373 13.4377 14.102C12.8757 14.6667 11.9704 14.6667 10.1604 14.6667H8.24039C6.42972 14.6667 5.52506 14.6667 4.96239 14.102C4.39972 13.5373 4.40039 12.6287 4.40039 10.8113V7.59801Z"
                                            fill="#878787"/>
                                        <path opacity="0.5"
                                              d="M2.78133 2.11459C2 2.89525 2 4.15259 2 6.66659V7.99992C2 10.5139 2 11.7713 2.78133 12.5519C3.19267 12.9639 3.73667 13.1586 4.528 13.2506C4.4 12.6906 4.4 11.9199 4.4 10.8106V7.59792C4.4 5.78059 4.4 4.87192 4.962 4.30725C5.52467 3.74259 6.42933 3.74259 8.24 3.74259H10.16C11.2613 3.74259 12.0267 3.74259 12.5853 3.86925C12.4933 3.07392 12.2987 2.52792 11.8853 2.11459C11.1047 1.33325 9.84733 1.33325 7.33333 1.33325C4.81933 1.33325 3.562 1.33325 2.78133 2.11459Z"
                                              fill="#878787"/>
                                </svg>

                                copy
                            </span>
                        </div>

                        <div
                            className="p-5 border border-[#353535] rounded-[6px] bg-transparent text-sm text-[#ccc] !overflow-x-auto mb-5">
<pre ref={preRef}>
  {"curl — X 'POST' \\\n"}
    {"'https://rest.audiosector.ru/v1/task/file' \\\n"}
    {"  -H 'accept: application/json' \\\n"}
    {"  -H 'api_key: "}
    <strong className="font-bold">токен_авторизации</strong>
    {"' \\\n"}
    {"  -H 'Content-Type: multipart/form-data' \\\n"}
    {"  -F 'uploaded_file=@test_file.mp3;type=audio/mpeg'"}
</pre>
                        </div>

                        <div className={`w-full flex items-start justify-between`}>
                            <h3>Пример на python</h3>
                            <span onClick={handleCopy} className={`flex items-center gap-2.5 font-[Rubik] text-[14px] cursor-pointer`}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M4.40039 7.59801C4.40039 5.78068 4.40039 4.87201 4.96239 4.30734C5.52506 3.74268 6.42972 3.74268 8.24039 3.74268H10.1604C11.9704 3.74268 12.8757 3.74268 13.4377 4.30734C14.0004 4.87201 14.0004 5.78068 14.0004 7.59801V10.8113C14.0004 12.6287 14.0004 13.5373 13.4377 14.102C12.8757 14.6667 11.9704 14.6667 10.1604 14.6667H8.24039C6.42972 14.6667 5.52506 14.6667 4.96239 14.102C4.39972 13.5373 4.40039 12.6287 4.40039 10.8113V7.59801Z"
                                            fill="#878787"/>
                                        <path opacity="0.5"
                                              d="M2.78133 2.11459C2 2.89525 2 4.15259 2 6.66659V7.99992C2 10.5139 2 11.7713 2.78133 12.5519C3.19267 12.9639 3.73667 13.1586 4.528 13.2506C4.4 12.6906 4.4 11.9199 4.4 10.8106V7.59792C4.4 5.78059 4.4 4.87192 4.962 4.30725C5.52467 3.74259 6.42933 3.74259 8.24 3.74259H10.16C11.2613 3.74259 12.0267 3.74259 12.5853 3.86925C12.4933 3.07392 12.2987 2.52792 11.8853 2.11459C11.1047 1.33325 9.84733 1.33325 7.33333 1.33325C4.81933 1.33325 3.562 1.33325 2.78133 2.11459Z"
                                              fill="#878787"/>
                                </svg>

                                copy
                            </span>
                        </div>

                        <div
                            className="p-5 border border-[#353535] rounded-[6px] bg-transparent text-sm text-[#ccc] !overflow-x-auto mb-[30px]">
<pre>
  {"import requests\n\n"}
    {"import json\n\n\n"}
    {'api_url = "https://rest.audiosector.ru/v1"\n\n'}
    {'file_path = "test_file.mp3"\n\n'}
    {'token = "'}
    <strong className="font-bold">токен_авторизации</strong>
    {'"\n\n'}
    {'headers = {"accept": "application/json", "api_key": token}\n\n'}
    {"with open(file_path, 'rb') as f:\n\n"}
    {"    files = {'file': (file_path, f)}\n\n"}
    {'    response = requests.post(f"{api_url}/task/file", headers=headers, files=files)\n\n'}
    {'    res = response.json()\n\n'}
    {'    print(res)'}
</pre>

                        </div>

                        <h3>Ответы</h3>
                        <p>
                            HTTP_200 - Возвращается id принятой задачи в очереди на обработку
                        </p>

                        <div
                            className="p-5 border border-[#353535] rounded-[6px] bg-transparent text-sm text-[#ccc] !overflow-x-auto my-5">
 <pre>
    {`{
    
 "task_id": "01JRF7CTHEFMF5ERH3PQYFTPC0"
 "account_balance": 360
 
}`}
  </pre>
                        </div>

                        <h3>
                            Передать URL на обработку
                        </h3>
                        <div
                            className="p-5 border border-[#353535] rounded-[6px] bg-transparent text-sm text-[#ccc] !overflow-x-auto my-5">
  <pre>
    {`POST /task/url`}
  </pre>
                        </div>

                        <h3>
                            Предварительная настройка
                        </h3>
                        <p>Перед использованием данного типа запросов сайт-источник должен быть подтверждён в личном
                            кабинете. Только для подтверждённого сайта можно указывать URL для скачивания файлов на
                            обработку.</p>

                        {/* Блок пример */}
                        <div className={`w-full flex items-start justify-between`}>
                            <h3>Пример</h3>
                            <span onClick={handleCopy}  className={`flex items-center gap-2.5 font-[Rubik] text-[14px] cursor-pointer`}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M4.40039 7.59801C4.40039 5.78068 4.40039 4.87201 4.96239 4.30734C5.52506 3.74268 6.42972 3.74268 8.24039 3.74268H10.1604C11.9704 3.74268 12.8757 3.74268 13.4377 4.30734C14.0004 4.87201 14.0004 5.78068 14.0004 7.59801V10.8113C14.0004 12.6287 14.0004 13.5373 13.4377 14.102C12.8757 14.6667 11.9704 14.6667 10.1604 14.6667H8.24039C6.42972 14.6667 5.52506 14.6667 4.96239 14.102C4.39972 13.5373 4.40039 12.6287 4.40039 10.8113V7.59801Z"
                                            fill="#878787"/>
                                        <path opacity="0.5"
                                              d="M2.78133 2.11459C2 2.89525 2 4.15259 2 6.66659V7.99992C2 10.5139 2 11.7713 2.78133 12.5519C3.19267 12.9639 3.73667 13.1586 4.528 13.2506C4.4 12.6906 4.4 11.9199 4.4 10.8106V7.59792C4.4 5.78059 4.4 4.87192 4.962 4.30725C5.52467 3.74259 6.42933 3.74259 8.24 3.74259H10.16C11.2613 3.74259 12.0267 3.74259 12.5853 3.86925C12.4933 3.07392 12.2987 2.52792 11.8853 2.11459C11.1047 1.33325 9.84733 1.33325 7.33333 1.33325C4.81933 1.33325 3.562 1.33325 2.78133 2.11459Z"
                                              fill="#878787"/>
                                </svg>

                                copy
                            </span>
                        </div>

                        <div
                            className="p-5 border border-[#353535] rounded-[6px] bg-transparent text-sm text-[#ccc] !overflow-x-auto mb-5">
 <pre>
  {"curl — X 'POST' \\\n\n"}
     {"'https://rest.audiosector.ru/v1/task/file' \\\n\n"}
     {"  -H 'accept: application/json' \\\n\n"}
     {"  -H 'api_key: "}
     <strong>токен_авторизации</strong>
     {"' \\\n\n"}
     {"  -d '{\n«url»: «https://example.com/collection/test.file.mp3»\n}'"}
</pre>

                        </div>


                        {/* Блок пример */}
                        <div className={`w-full flex items-start justify-between`}>
                            <h3>Пример на python</h3>
                            <span onClick={handleCopy}  className={`flex items-center gap-2.5 font-[Rubik] text-[14px] cursor-pointer`}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M4.40039 7.59801C4.40039 5.78068 4.40039 4.87201 4.96239 4.30734C5.52506 3.74268 6.42972 3.74268 8.24039 3.74268H10.1604C11.9704 3.74268 12.8757 3.74268 13.4377 4.30734C14.0004 4.87201 14.0004 5.78068 14.0004 7.59801V10.8113C14.0004 12.6287 14.0004 13.5373 13.4377 14.102C12.8757 14.6667 11.9704 14.6667 10.1604 14.6667H8.24039C6.42972 14.6667 5.52506 14.6667 4.96239 14.102C4.39972 13.5373 4.40039 12.6287 4.40039 10.8113V7.59801Z"
                                            fill="#878787"/>
                                        <path opacity="0.5"
                                              d="M2.78133 2.11459C2 2.89525 2 4.15259 2 6.66659V7.99992C2 10.5139 2 11.7713 2.78133 12.5519C3.19267 12.9639 3.73667 13.1586 4.528 13.2506C4.4 12.6906 4.4 11.9199 4.4 10.8106V7.59792C4.4 5.78059 4.4 4.87192 4.962 4.30725C5.52467 3.74259 6.42933 3.74259 8.24 3.74259H10.16C11.2613 3.74259 12.0267 3.74259 12.5853 3.86925C12.4933 3.07392 12.2987 2.52792 11.8853 2.11459C11.1047 1.33325 9.84733 1.33325 7.33333 1.33325C4.81933 1.33325 3.562 1.33325 2.78133 2.11459Z"
                                              fill="#878787"/>
                                </svg>
                                copy
                            </span>
                        </div>

                        <div
                            className="p-5 border border-[#353535] rounded-[6px] bg-transparent text-sm text-[#ccc] !overflow-x-auto mb-[30px]">
 <pre>
  {"import requests\n\n\n"}
     {"import json\n\n"}
     {'api_url = «https://rest.audiosector.ru/v1»\n\n'}
     {'file_url = «https://example.com/collection/test_file.mp3»\n\n'}
     {'payload = {«url»: file_url}\n\n'}
     {"token ='"}
     <strong>токен_авторизации</strong>
     {"'\n\n"}
     {'headers = {«accept»: «application/json», «api_key»: token}\n\n'}
     {'response = requests.post(f“{api_url}/task/url“,headers=headers,json=payload)\n\n'}
     {'res = response.json()\n\n'}
     {'print(res)'}
</pre>
                        </div>

                        <h3>Ответы</h3>
                        <p>
                            HTTP_200 - Возвращается id принятой задачи в очереди на обработку
                        </p>

                        <div
                            className="p-5 border border-[#353535] rounded-[6px] bg-transparent text-sm text-[#ccc] !overflow-x-auto my-5">
 <pre>
    {`{
    
  "task_id": "01JRF7CTHEFMF5ERH3PQYFTPC0"
  "account_balance": 360
 
}`}
  </pre>
                        </div>


                        <h3>Получить результат</h3>
                        <div
                            className={`text-sm p-5 border border-[#353535] rounded-[6px] bg-transparent mb-[30px]`}>
                            <pre>
                                {`GET /task/result/{task_id}`}
                            </pre>
                        </div>

                        <h3>Пример</h3>

                        <div
                            className="p-5 border border-[#353535] rounded-[6px] bg-transparent text-sm text-[#ccc] !overflow-x-auto mb-5">
  <pre>
    {`curl — X 'GET' \\

'https://rest.audiosector.ru/v1/task/result/01JRF7CTHEFMF5ERH3PQYFTPC0' \\

  -H 'accept: application/json' \\`}
  </pre>
                        </div>

                        <h3>Ответы</h3>
                        <p>
                            HTTP_204 - Результат еще не готов
                        </p>
                        <p>
                            HTTP_200 - Возвращается json с результатом расшифровки следующего вида.
                        </p>

                        <div
                            className="p-5 border border-[#353535] rounded-[6px] bg-transparent text-sm text-[#ccc] !overflow-x-auto mt-5">
  <pre>
    {`{

«segments»: [{

«start»: 0.983,

«end»: 1.731,

«text»: « Раз, два, три».,

«words»: [{
«word»: «Раз,», «start»: 0.983, «end»: 1.165, «score»: 0.916

},

{

«word»: «два,», «start»: 1.185, «end»: 1.307, «score»: 0.537

},

{

«word»: «три»., «start»: 1.367, «end»: 1.731, «score»: 0.734

}]

},

{

«start»: 1.772,

«end»: 2.56,

«text»: «Проверка связи».,

«words»: [{

«word»: «Проверка», «start»: 1.772, «end»: 2.237, «score»: 0.927

},

{

«word»: «связи»., «start»: 2.277, «end»: 2.56, «score»: 0.454

}]

}],

«language»: «ru»

}`}
  </pre>
                        </div>

                    </section>

                    {/*                    <section id="error-codes">*/}
                    {/*                        <h2>Общие коды возвращаемых ошибок</h2>*/}
                    {/*                        <p>*/}
                    {/*                            HTTP_422 — Ошибка валидации параметров (некорректные значения или не полный набор)*/}
                    {/*                        </p>*/}
                    {/*                        <p>*/}
                    {/*                            HTTP_401 — Ошибка авторизации*/}
                    {/*                        </p>*/}
                    {/*                        <p>*/}
                    {/*                            HTTP_402 — Ошибка: недостаточная сумма на лицевом счёту*/}
                    {/*                        </p>*/}
                    {/*                        <p>*/}
                    {/*                            HTTP_500 — Внутренняя ошибка сервера*/}
                    {/*                        </p>*/}


                    {/*                        <p className={`mt-5`}>*/}
                    {/*                            HTTP_200 — Возвращается id принятой задачи в очереди на обработку*/}
                    {/*                        </p>*/}
                    {/*                        <div*/}
                    {/*                            className="p-5 border border-[#353535] rounded-[6px] bg-transparent text-sm text-[#ccc] !overflow-x-auto my-5">*/}
                    {/*  <pre>*/}
                    {/*    {`{*/}
                    {/*    */}
                    {/*«task_id»: «01JRF7CTHEFMF5ERH3PQYFTPC0»*/}

                    {/*«account_balance»: 360*/}

                    {/*}`}*/}
                    {/*  </pre>*/}
                    {/*                        </div>*/}

                    {/*                        <p>*/}
                    {/*                            HTTP_204 — Результат ещё не готов*/}
                    {/*                        </p>*/}
                    {/*                        <p>*/}
                    {/*                            HTTP_200 — Возвращается json с результатом расшифровки следующего вида.*/}
                    {/*                        </p>*/}
                    {/*                        <div*/}
                    {/*                            className="p-5 border border-[#353535] rounded-[6px] bg-transparent text-sm text-[#ccc] !overflow-x-auto mt-5">*/}
                    {/*  <pre>*/}
                    {/*    {`{*/}

                    {/*«segments»: [{*/}

                    {/*«start»: 0.983,*/}

                    {/*«end»: 1.731,*/}

                    {/*«text»: « Раз, два, три».,*/}

                    {/*«words»: [{*/}
                    {/*«word»: «Раз,», «start»: 0.983, «end»: 1.165, «score»: 0.916*/}

                    {/*},*/}

                    {/*{*/}

                    {/*«word»: «два,», «start»: 1.185, «end»: 1.307, «score»: 0.537*/}

                    {/*},*/}

                    {/*{*/}

                    {/*«word»: «три»., «start»: 1.367, «end»: 1.731, «score»: 0.734*/}

                    {/*}]*/}

                    {/*},*/}

                    {/*{*/}

                    {/*«start»: 1.772,*/}

                    {/*«end»: 2.56,*/}

                    {/*«text»: «Проверка связи».,*/}

                    {/*«words»: [{*/}

                    {/*«word»: «Проверка», «start»: 1.772, «end»: 2.237, «score»: 0.927*/}

                    {/*},*/}

                    {/*{*/}

                    {/*«word»: «связи»., «start»: 2.277, «end»: 2.56, «score»: 0.454*/}

                    {/*}]*/}

                    {/*}],*/}

                    {/*«language»: «ru»*/}

                    {/*}`}*/}
                    {/*  </pre>*/}
                    {/*                        </div>*/}

                    {/*                    </section>*/}
                </div>
            </div>
        </div>
    );
}
