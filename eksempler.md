# Eksempler

## aabningstider.json tid

```javascript
let time = 1845;
time = time.toString();
let hour = time.substring(0,2);
let minute = time.substring(2,4);
```

Hvis `time` variablen ikke er typen string skal den konverteres til en string med `time = time.toString();` som i eksemplet, men er `time` allerede string behøves den ikke.
`time` variablen er tidspunktet hentet fra JSON objektet. `hour` variablen tager de to første tegn fra `time` variablen, mens `minute` variablen tager de to sidste tegn fra `time` variablen. 

`hour = 18` \
`minute = 45`

## booking.json dato

```javascript
let date = '2018-02-12T13:45:00Z';
let dateUnix = new Date(date).valueOf();
```

`date` variablen er den ønskede dag og tid som skal konverters til unix før den indsættes i databasen - `YYYY-MM-DDTHH:MM:SS`.   
`dateUnix` variablen er `date` konverteret til unix.

`dateUnix = 1518443100000`

```javascript
let newDate = new Date(dateUnix);
let bookingDay = newDate.getDate();
```

`bookingDay = 12`
