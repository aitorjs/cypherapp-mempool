
# cypherapp-mempool-server

## Install

- Need on the root of the project file on named .env with this content:
``` 
{
    "cypherApi": "",
    "h64": "",
    "apiId": "",
    "apiKey": ""
}
```

## Run

```npm run start```

## curl example

```code
id="003";h64=$(echo -n "{\"alg\":\"HS256\",\"typ\":\"JWT\"}" | base64);p64=$(echo -n "{\"id\":\"$id\",\"exp\":$((`date +"%s"`+10))}" | base64);k="KEY";s=$(echo -n "$h64.$p64" | openssl dgst -hmac "$k" -sha256 -r | cut -sd ' ' -f1);token="$h64.$p64.$s";curl -v -H "Authorization: Bearer $token" -k https://127.0.0.1:2009/v0/getmempoolinfo
```
