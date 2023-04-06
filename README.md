Exchange Socket Client
======================


**RU**

### Описание:

* Получение данных о котировках с удаленного сервера. Соединение с удаленным сервером по сокету.
Данные поступают в таком формате  json, поля : {id : id_котировки, value : значение_котировки}

* В клиентской части все данные по сокету систематизируются. По полученным данным производятся вычисления основных аналитических величин.

* Интерфейс содержит две кнопки для запуска процесса сбора котировок и кнопки для получения данных вычислений по котировкам, которые поступили на текущий момент.

* Данные вычислений записываются в базу данных по аякс.

* По 
получению количества котировок указанного в поле ввода считает такие статистические 
значения: арифметическое среднее, стандартное отклонение, моду (при мультимодности 
достаточно только одну моду), минимальное значение, максимальное значение, количество 
потерянных котировок если такие есть, дата/время запуска расчетов, время потраченное на 
расчеты, отправляет статистические параметры на php бэк для добавления записи в бд

__Приложение построено с использованием:__ 
* React.js
* php + mysql
* node.js
* WebSocket
* bootstrap 5