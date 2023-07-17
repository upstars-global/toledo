import axios from "axios";

function getChanelHook(project: string): string {
    if (project === 'alpa') {
        return "https://hooks.slack.com/services/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"
    }

    return "https://hooks.slack.com/services/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"
};

function getText(project: string, testId: string): string {
    if (project === 'alpa') {
        return `Test new tag <https://gitlab.upstr.to/whitelabel/frontera/-/tags/${ testId }|${ testId }> ended with errors`
    }

    return `Test new release "${ testId }" ended with errors`
}

export default {
    send: function send(project: string, testId: string) {
        if (!testId) {
            return;
        }

        axios.post(getChanelHook(project), {
            "text": `Test ${ testId } ended with errors`,
            "pretty": 1,
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "text": getText(project, testId),
                        "type": "mrkdwn"
                    }
                },
                {
                    "type": "actions",
                    "elements": [
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Result"
                            },
                            "style": "primary",
                            "url": `https://toledo-staging.upstr.to/report/${ project }/${ testId }`
                        }
                    ]
                }
            ]
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}
