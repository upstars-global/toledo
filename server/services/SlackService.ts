import axios from "axios";

export default {
    send: function send(project: string, testId: string) {
        if (!testId) {
            return;
        }

        if (project !== "alpa") {
            return;
        }

        axios.post("https://hooks.slack.com/services/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", {
            "text": `Test ${ testId } ended with errors`,
            "pretty": 1,
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "text": `Test new tag <https://gitlab.bbq.agency/bbq/frontera/-/tags/${ testId }|${ testId }> ended with errors`,
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
                            "url": `https://toledo-staging.os.show/report/alpa/${ testId }`
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
