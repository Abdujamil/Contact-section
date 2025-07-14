"use client";
import styles from "@/app/page.module.scss";
import React from "react";

export default function OrganizationApiContent() {
    return (
        <div>
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
                    <section id="endpoints">
                        <h2>Эндпоинты</h2>

                        <h3>Передать файл на обработку</h3>
                        <div
                            className="p-5 border border-[#353535] rounded-[6px] bg-transparent text-sm text-[#ccc] !overflow-x-auto my-5">
  <pre>
    {`POST /task/file`}
  </pre>
                        </div>

                        {/*<div className={`p-5 border border-[#353535] rounded-[6px]`}>*/}
                        {/*    <p>*/}
                        {/*        curl — X 'POST' \*/}
                        {/*    </p>*/}
                        {/*    <p>*/}
                        {/*        'https://rest.audiosector.ru/v1/task/file' \*/}
                        {/*    </p>*/}
                        {/*    <p>*/}
                        {/*        -H 'accept: application/json' \*/}
                        {/*    </p>*/}
                        {/*    <p>*/}
                        {/*        -H 'api_key: токен_авторизации' \*/}
                        {/*    </p>*/}
                        {/*    <p>*/}
                        {/*        -H 'Content-Type: multipart/form-data' \*/}
                        {/*    </p>*/}
                        {/*    <p>*/}
                        {/*        -F 'uploaded_file=@test_file.mp3;type=audio/mpeg'*/}
                        {/*    </p>*/}
                        {/*</div>*/}
                        <h3>Пример</h3>

                        <div
                            className="p-5 border border-[#353535] rounded-[6px] bg-transparent text-sm text-[#ccc] !overflow-x-auto">
  <pre>
    {`curl — X 'POST' \\

'https://rest.audiosector.ru/v1/task/file' \\

  -H 'accept: application/json' \\

  -H 'api_key: токен_авторизации' \\

  -H 'Content-Type: multipart/form-data' \\

  -F 'uploaded_file=@test_file.mp3;type=audio/mpeg'`}
  </pre>
                        </div>

                        <h3 className={`mt-5`}>Пример на python</h3>

                        <div
                            className="p-5 border border-[#353535] rounded-[6px] bg-transparent text-sm text-[#ccc] !overflow-x-auto mb-[30px]">
  <pre>
    {`import requests

import json


api_url = "https://rest.audiosector.ru/v1"

file_path = "test_file.mp3"

token = "токен_авторизации"

headers = {"accept": "application/json", "api_key": token}

with open(file_path, 'rb') as f:

files = {'file': (file_path, f)}

response = requests.post(f"{api_url}/task/file", headers=headers, files=files)

res = response.json()

print(res)`}
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

                        <h3>Пример</h3>

                        <div
                            className="p-5 border border-[#353535] rounded-[6px] bg-transparent text-sm text-[#ccc] !overflow-x-auto">
  <pre>
    {`curl — X 'POST' \\

'https://rest.audiosector.ru/v1/task/file' \\

  -H 'accept: application/json' \\

  -H 'api_key: токен_авторизации' \\

  -d '{ «url»: «https://example.com/collection/test.file.mp3» }'`}
  </pre>
                        </div>

                        <h3 className={`mt-5`}>Пример на python</h3>

                        <div
                            className="p-5 border border-[#353535] rounded-[6px] bg-transparent text-sm text-[#ccc] !overflow-x-auto mb-[30px]">
  <pre>
    {`import requests


import json

api_url = «https://rest.audiosector.ru/v1»

file_url = «https://example.com/collection/test_file.mp3»

payload = {«url»: file_url}

token ='токен_авторизации'

headers = {«accept»: «application/json», «api_key»: token}

response = requests.post(f“{api_url}/task/url“,headers=headers,json=payload)

res = response.json()

print(res)`}
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
                            className="p-5 border border-[#353535] rounded-[6px] bg-transparent text-sm text-[#ccc] !overflow-x-auto">
  <pre>
    {`curl — X 'GET' \\

'https://rest.audiosector.ru/v1/task/result/01JRF7CTHEFMF5ERH3PQYFTPC0' \\

  -H 'accept: application/json' \\`}
  </pre>
                        </div>

                    </section>
                    <section id="error-codes">
                        <h2>Общие коды возвращаемых ошибок</h2>
                        <p>
                            HTTP_422 — Ошибка валидации параметров (некорректные значения или не полный набор)
                        </p>
                        <p>
                            HTTP_401 — Ошибка авторизации
                        </p>
                        <p>
                            HTTP_402 — Ошибка: недостаточная сумма на лицевом счёту
                        </p>
                        <p>
                            HTTP_500 — Внутренняя ошибка сервера
                        </p>


                        <p className={`mt-5`}>
                            HTTP_200 — Возвращается id принятой задачи в очереди на обработку
                        </p>
                        <div
                            className="p-5 border border-[#353535] rounded-[6px] bg-transparent text-sm text-[#ccc] !overflow-x-auto my-5">
  <pre>
    {`{
    
«task_id»: «01JRF7CTHEFMF5ERH3PQYFTPC0»

«account_balance»: 360

}`}
  </pre>
                        </div>

                        <p>
                            HTTP_204 — Результат ещё не готов
                        </p>
                        <p>
                            HTTP_200 — Возвращается json с результатом расшифровки следующего вида.
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
                </div>
            </div>
        </div>
    );
}
