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
Setup your channel Webhook URL in the application, here : [SLACK_CHWEB_HOOK](src/constant.js#L14)

#### 3. Install node
```
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### 4. Run the application
```
./start.sh
```
