import { CfnOutput, Construct, Stage, StageProps } from '@aws-cdk/core';
import { IamGitopsCdkStack } from './iam-gitops-cdk-stack';

export class IamGitopsCdkStage extends Stage {
  
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const service = new IamGitopsCdkStack(this, 'iam-gitops');
    
  }
}