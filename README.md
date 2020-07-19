# Web Vitals API
> ⚡️ Given a set of origins or urls returns its core web vitals metrics from Chrome UX Report.

The Web Vitals API was built for simplicity to compare multiple domains or urls with a single request.

```
curl https://crux.pazguille.me/api/web-vitals?origins=https://reactjs.org,https://vuejs.org
```

<details>
  <summary>Click to Expand Results</summary>

  ```json
  [
    {
      "origin": "https://reactjs.org",
      "metrics": {
        "FID": {
          "histogram": [{
            "start": 0,
            "end": 100,
            "density": 0.8992395437262332
          }, {
            "start": 100,
            "end": 300,
            "density": 0.049429657794676674
          }, {
            "start": 300,
            "density": 0.0513307984790871
          }],
          "percentiles": {
            "p75": 45
          }
        },
        "LCP": {
          "histogram": [{
            "start": 0,
            "end": 2500,
            "density": 0.9036738351254479
          }, {
            "start": 2500,
            "end": 4000,
            "density": 0.0586917562724014
          }, {
            "start": 4000,
            "density": 0.03763440860215059
          }],
          "percentiles": {
            "p75": 1582
          }
        },
        "CLS": {
          "histogram": [{
            "start": "0.00",
            "end": "0.10",
            "density": 0.9881422924901181
          }, {
            "start": "0.10",
            "end": "0.25",
            "density": 0.003952569169960473
          }, {
            "start": "0.25",
            "density": 0.007905138339920941
          }],
          "percentiles": {
            "p75": "0.04"
          }
        },
        "FCP": {
          "histogram": [{
            "start": 0,
            "end": 1000,
            "density": 0.47284060552092616
          }, {
            "start": 1000,
            "end": 3000,
            "density": 0.4639358860195905
          }, {
            "start": 3000,
            "density": 0.06322350845948325
          }],
          "percentiles": {
            "p75": 1541
          }
        }
      }
    },

    {
      "origin": "https://vuejs.org",
      "metrics": {
        "LCP": {
          "histogram": [{
            "start": 0,
            "end": 2500,
            "density": 0.8596385542168664
          }, {
            "start": 2500,
            "end": 4000,
            "density": 0.08373493975903605
          }, {
            "start": 4000,
            "density": 0.05662650602409588
          }],
          "percentiles": {
            "p75": 1711
          }
        },
        "CLS": {
          "histogram": [{
            "start": "0.00",
            "end": "0.10",
            "density": 0.654498044328552
          }, {
            "start": "0.10",
            "end": "0.25",
            "density": 0.25293350717079505
          }, {
            "start": "0.25",
            "density": 0.09256844850065184
          }],
          "percentiles": {
            "p75": "0.14"
          }
        },
        "FCP": {
          "histogram": [{
            "start": 0,
            "end": 1000,
            "density": 0.5835266821345682
          }, {
            "start": 1000,
            "end": 3000,
            "density": 0.32482598607888463
          }, {
            "start": 3000,
            "density": 0.09164733178654262
          }],
          "percentiles": {
            "p75": 1533
          }
        },
        "FID": {
          "histogram": [{
            "start": 0,
            "end": 100,
            "density": 0.9562043795620442
          }, {
            "start": 100,
            "end": 300,
            "density": 0.03284671532846716
          }, {
            "start": 300,
            "density": 0.010948905109489062
          }],
          "percentiles": {
            "p75": 21
          }
        }
      }
    }
  ]
  ```
</details>

### Endpoint
```
https://crux.pazguille.me/api/web-vitals
```

### Query Parameters

| Param  | Type    | Required | Description                                                                                                                                                  |
|--------|---------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| origins | string  | false     | A comma-separated list of domains. All data present for all pages in that domain are aggregated together.                                               |
| urls | string  | false     | A comma-separated list of specific urls. Only data for that specific url will be returned.                                               |

### Response [WIP]
A structure with the following shape:

| Property  | Type    | Description                                                                                                                                                  |
|--------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| origin or url | string  |                                                |
| metrics | object  |                                                |

## With ❤ by

- Guille Paz (Frontend Web Developer & Web standards lover)
- E-mail: [guille87paz@gmail.com](mailto:guille87paz@gmail.com)
- Twitter: [@pazguille](https://twitter.com/pazguille)
- Web: [https://pazguille.me](https://pazguille.me)

## License

MIT license. Copyright © 2020.
