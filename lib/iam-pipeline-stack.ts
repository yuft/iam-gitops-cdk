import { CfnOutput, Construct, SecretValue, Stack, StackProps } from '@aws-cdk/core'
import * as codepipeline from '@aws-cdk/aws-codepipeline'
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions'
import { CdkPipeline, SimpleSynthAction } from '@aws-cdk/pipelines'
import { IamGitopsCdkStage } from './iam-gitops-cdk-stage'


export class IamPipelineStack extends Stack {
    public readonly urlOutput: CfnOutput

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props)

        const sourceArtifact = new codepipeline.Artifact();
        const cloudAssemblyArtifact = new codepipeline.Artifact();

        const pipeline = new CdkPipeline(this, 'iam-pipeline', {
            pipelineName: 'iam-pipeline',
            cloudAssemblyArtifact,
            sourceAction: new codepipeline_actions.GitHubSourceAction({
                actionName: 'GitHub',
                output: sourceArtifact,
                oauthToken: SecretValue.secretsManager('github-token'),
                owner: 'yuft',
                repo: 'iam-gitops-cdk'
            }),
            synthAction: SimpleSynthAction.standardNpmSynth({
                sourceArtifact,
                cloudAssemblyArtifact,
                buildCommand: 'npm run build'
            })
        })

        pipeline.addApplicationStage(new IamGitopsCdkStage(this, 'dev'));
    }
}