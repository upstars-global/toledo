import { ENVIRONMENT } from '@config';
import axios from 'axios';

function getChanelHook(project: string): string {
    if (project === 'alpa') {
        return 'https://hooks.slack.com/services/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';
    }

    return 'https://hooks.slack.com/services/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';
}

function getReportLink(project: string, testId: string): string {
    const env = String(ENVIRONMENT);

    return `https://toledo-${ env }.wlabel.site/report/${ project }/${ testId }`;
}

function getText(testId: string): string {
    if (testId.startsWith('ALPA-') || testId.startsWith('FP-')) {
        return `Test for task <https://upstars.atlassian.net/browse/${ testId.toUpperCase() }|${ testId }> ended`;
    }

    const [ _, tagName, pipelineId ] = testId.split('_');
    if (tagName && pipelineId) {
        return `Test for new release <https://gitlab.upstr.to/whitelabel/frontera/-/pipelines/${ pipelineId }|${ tagName }> ended`;
    }

    return `Test for new tag <https://gitlab.upstr.to/whitelabel/frontera/-/tags/${ testId }|${ testId }> ended`;
}

export default {
    send: function send(project: string, testId: string, result: {
        passed: number,
        failed: number
    }) {
        if (!testId) {
            return;
        }

        axios.post(getChanelHook(project), {
            text: `Test ${ testId } ended with errors`,
            pretty: 1,
            blocks: [
                {
                    type: 'section',
                    text: {
                        text: getText(testId),
                        type: 'mrkdwn',
                    },
                },
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: 'Results:',
                    },
                },
                {
                    type: 'rich_text',
                    elements: [
                        {
                            type: 'rich_text_list',
                            elements: [
                                {
                                    type: 'rich_text_section',
                                    elements: [
                                        {
                                            type: 'text',
                                            text: `Passed: ${ result.passed }`,
                                        },
                                    ],
                                },
                                {
                                    type: 'rich_text_section',
                                    elements: [
                                        {
                                            type: 'text',
                                            text: `Failed: ${ result.failed }`,
                                        },
                                    ],
                                },
                            ],
                            style: 'bullet',
                            indent: 0,
                        },
                    ],
                },
                {
                    type: 'actions',
                    elements: [
                        {
                            type: 'button',
                            text: {
                                type: 'plain_text',
                                text: 'Result',
                            },
                            style: 'primary',
                            url: getReportLink(project, testId),
                        },
                    ],
                },
            ],
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    },
};
