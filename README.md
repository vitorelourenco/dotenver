This is a CLI tool to dynamically generate a .env file from any yaml file.

Usage:

script1: "dotenver prepare --s= && do some stuff"
script2: "dotenver && do some stuff"

Explanation:
You can generate a file in your local machine base on a source defined before uploading it to a cloud provider.
Then the build process of the cloud provider can access it and generate a .env file in the cloud.
This way you can upload different env variables to different projects that share the same repo.

Example with Google Cloud:

package.json
{
  ...
  scripts: {
  deploy-dev: dotenver prepare --s=dev_env.yaml && gcloud config set project dev-project-name && gcloud app deploy,
  deploy-prod: dotenver prepare --s=prod_env.yaml && gcloud config set project prod-project-name && gcloud app deploy,
  "gcp-build": "dotenver && npm run compile && npm run build",
  },
  ...
}

Now your app can access .env at runtime and buildtime.
