# Currency Converter

## Steps

1. Register to https://apilayer.com/
2. Copy the API Key
3. Install this package

```
$ npm install -g @nusendra/currency-converter
```

4. Paste the API Key

```
$ currency-converter -api <your_api_key>
```

5. Ready to use.

## Options

By default it will convert your currency from USD to IDR

```
$ currency-converter <amount>
```

If you want to change the currency, just change the first and second parameter, and the amount in third.

```
$ currency-converter SGD IDR 2000
```
