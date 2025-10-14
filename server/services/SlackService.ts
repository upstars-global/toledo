import axios from 'axios';
import { CLIENT_ADDR, SLACK_CHANEL, REPO_URL } from '@config';

function getReportLink(folder: string): string {
    return `${ CLIENT_ADDR }/${ folder }`;
}

function getFolderParams(folder: string) {
    if (folder.includes('_')) {
        const [ _, tagName, pipelineId ] = folder.split('_');
        return {
            tagName,
            pipelineId,
        }
    }

    const regexTask = /[a-z]{2}-\d+/;
    const regexEnv = /[a-z]{2}-\d+-.+$/;
    const matchTask = folder.match(regexTask);
    const matchEnv = folder.match(regexEnv);

    return {
        env: matchEnv ? matchEnv[0] : null,
        task: matchTask ? matchTask[0] : folder,
    }
}

function getText(testId: string, time: number): string {
    const repoUrl = REPO_URL ?? 'https://gitlab.upstr.to/whitelabel/frontera'
    const {
        env,
        task,
        tagName,
        pipelineId,
    } = getFolderParams(testId)
    if (task && env) {
        return `Test for task <https://upstars.atlassian.net/browse/${ task.toUpperCase() }|${ env }> ended`;
    }

    if (task) {
        return `Test for <${ getReportLink(testId) }|${ task }> ended`;
    }

    if (tagName && pipelineId) {
        return `Test for new release <${repoUrl}/-/pipelines/${ pipelineId }|${ tagName }> ended, and take: ${ time.toFixed(2) } minutes`;
    }

    return `Test for new tag <${repoUrl}/-/tags/${ testId }|${ testId }> ended, and take: ${ time.toFixed(2) } minutes`;
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
        if (!folder || !SLACK_CHANEL) {
            return;
        }

        axios.post(SLACK_CHANEL, {
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
