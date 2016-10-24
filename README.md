# cws-ee-asset-uploader
Helper library for uploading assets to Earth Engine.  Wraps gsutil and earthengine command line utilities.

## Requirements

Unfortunately there is a bit of setup to run this tool.  Here are the requirements:

 - [NodeJS](https://nodejs.org/en/download/)
 - [Earth Engine Command Line Tool](https://developers.google.com/earth-engine/python_install)
   - Command line tool is provided with the Python library
 - [gsutil](https://cloud.google.com/sdk/docs/)

## Install

```bash
npm install -g cws-ee-asset-uploader
```

## Setup

In order to upload files you will need to authenticate with both **earthengine** and **gsutil** command line
tools.  It is recommended you login with the same account to both.

Earth Engine Command Line Tool - Authentication
```bash
# this will open your browser, have you login then paste a code into the terminal
earthengine authenticate
``` 

gsutil - Authentication
```bash
# this will open your browser, have you login then paste a code into the terminal
gcloud init
``` 

You only need to authenticate once, not every time you use the cws-ee-asset-uploader.  Unless
you want to switch accounts.

Finally, create a staging bucket (ucd.cws.ee.data already has this, do not recreate).

```bash
gsutil mb -c coldline gs://earth-engine-stagging
```

## Usage

### Help

```bash
> cws-ee-asset-uploader --help

  Usage: cws-ee-asset-uploader cws-ee-asset-uploader [Earth Engine Path] <File...>

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    -y, --yes      Do not prompt for approval before uploading
    -r, --rm       Allow overwriting of existing EE files
```

### Upload

```bash
cws-ee-asset-uploader users/ucd-cws-ee-data/uploading-testing et24_03212015_P44R33_L8_BD.tif
```
or
```bash
cws-ee-asset-uploader users/ucd-cws-ee-data/uploading-testing *.tif
```