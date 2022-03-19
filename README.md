# svg-rewriter

add attributes to a svg file from a url

Example:

Say I want to change the color of the Cloudflare svg in the [Simple Icons](https://github.com/simple-icons/simple-icons) collection to orange. The jsDelivr CDN url for the svg is https://cdn.jsdelivr.net/npm/simple-icons@6/icons/cloudflare.svg.

> Note: by using jsDelivr the version of the svg can also be changed. The version here is specified as the major version 6, meaning the icon can be updated to the latest version. However, you can specify a more specific version if you don't want it to be updated.

```
GET https://svg-rewriter.sachinraja.workers.dev/?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2Fsimple-icons%406%2Ficons%2Fcloudflare.svg&fill=orange
```

You can use [an encoding tool](https://meyerweb.com/eric/tools/dencoder/) to encode the url in your request.

## URL Parameters

`url` - The url of the svg file, required.

`*` (all other parameters) - The attributes to add to the svg with the key as the attribute name and the value as the attribute value.
