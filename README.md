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
* React.js + Redux
* php + mysql
* node.js
* WebSocket
* ajax
* bootstrap 5

**EN**

### Description:
* Receiving data on quotes from a remote server. Connecting to a remote server via socket. The data comes in the following json format, fields: {id : quote_id, value : quote_value}

* In the client part, all data on the socket is systematized. Based on the data obtained, the main analytical quantities are calculated.

* The interface contains two buttons for launching the process of collecting quotes and buttons for receiving calculation data on quotes that have been received at the current moment.

* Calculation data is written to the database via ajax.

* Upon receipt of the number of quotes specified in the input field, it calculates the following statistical values: arithmetic mean, standard deviation, mode (with multimode, only one mode is enough), minimum value, maximum value, number of lost quotes, if any, date/time of calculation start, time spent for calculations, sends statistical parameters to php back to add a record to the database

__The app is built using:__

* React.js + Redux
* php + mysql
* node.js
* web socket
* ajax
* bootstrap 5
