import axios from 'axios';
import { PROJECT } from '@config';

function getChanelHook(): string {
    if (PROJECT === 'alpa') {
        return 'https://hooks.slack.com/services/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';
    }

    return 'https://hooks.slack.com/services/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';
}

function getReportLink(folder: string): string {
    return `https://backstop-panel.pages.dev/report/${ PROJECT }/${ folder }`;
}

function getFolderParams(folder: string) {
    if (folder.includes('_')) {
        const [ _, tagName, pipelineId ] = folder.split('_');
        return {
            tagName,
            pipelineId,
        }
    }

    return {
        task: folder.replace('frontera-', '').replace('-mock', '').replace('-thor', '').replace('-ss', '')
    }
}

// frontera_v9-3-359-ss_308626
// frontera-alpa-develop-mock
// frontera-fp-2421-thor-mock
// frontera-thor-staging-mock
function getText(testId: string, time: number): string {
    const {
        task,
        tagName,
        pipelineId,
    } = getFolderParams(testId)
    if (task) {
        return `Test for task <https://upstars.atlassian.net/browse/${ task }|${ task }> ended`;
    }

    if (tagName && pipelineId) {
        return `Test for new release <https://gitlab.upstr.to/whitelabel/frontera/-/pipelines/${ pipelineId }|${ tagName }> ended, and take: ${ time } minutes`;
    }

    return `Test for new tag <https://gitlab.upstr.to/whitelabel/frontera/-/tags/${ testId }|${ testId }> ended, and take: ${ time } minutes`;
}

export default {
    send: function send({
        folder,
        passed,
        failed,
        time
    }: {
        folder: string,
        passed: number,
        failed: number,
        time: number,
    }) {
        if (!folder) {
            return;
        }

        axios.post(getChanelHook(), {
            text: `Test ${ folder } ended with errors, and take: ${ time / 60000 } minutes`,
            pretty: 1,
            blocks: [
                {
                    type: 'section',
                    text: {
                        text: getText(folder, time / 60000),
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
                                            text: `Passed: ${ passed }`,
                                        },
                                    ],
                                },
                                {
                                    type: 'rich_text_section',
                                    elements: [
                                        {
                                            type: 'text',
                                            text: `Failed: ${ failed }`,
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
                            url: getReportLink(folder),
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
