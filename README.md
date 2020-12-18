# Slack Adzan Notification

Bismillah, 

If you need Adzan Notification in your Slack Channel, 
you can use this app,. it's build on top nodejs and utilize Slack Webhook.
The prayer times source is based on Aladhan (https://aladhan.com/), you can add another sources by creating your own implementation, please see the sample in `impl` folder.

It's already used in blanja.com Platform Dept.

Hopefully it will be useful for others.
Warm Regards

#### 1. Setup Slack Channel Webhook
Please follow this link to setup your [Slack Channel Webhook](https://slack.com/intl/en-id/help/articles/115005265063-Incoming-webhooks-for-Slack)

#### 2. Integrate
Setup your channel Webhook URL, Country Location, City Location in the System Environment, or if using docker you can set the value in the [docker-compose.yml](deploy/docker-compose.yml#L7)

#### 3. Run the application
```
$ git clone http://gitlab.playcourt.id/riobastian/slack-adzan-notification.git
$ cd slack-adzan-notification
$ docker build --tag app-adzan:1.0.0 .
$ docker-compose -f deploy/docker-compose.yml up -d
```

#### 4. or, Run the application from Docker Hub
```
$ docker pull altanovela/app-adzan:1.0.0
$ docker run -d --rm \
--name slack-adzan-notification \
-e SLACK_CHWEB_HOOK=https://hooks.slack.com/services/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 \
-e LOCATION_COUNTRY=ID \
-e LOCATION_CITY=Jakarta \
altanovela/app-adzan:1.0.0
```

## Contributors
| Name | Email | Role |
| ------------ | ------------ | ------------ |
| Rio Bastian | rio.bastian@metranet.co.id | Authors |
