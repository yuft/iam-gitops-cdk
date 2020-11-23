import * as cdk from '@aws-cdk/core';
import { PolicyStatement, Role, ServicePrincipal, User } from '@aws-cdk/aws-iam';

export class IamGitopsCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const role = new Role(this, 'MyRole', {
      assumedBy: new ServicePrincipal('sns.amazonaws.com'),
    });

    role.addToPolicy(new PolicyStatement({
      resources: ['*'],
      actions: ['lambda:InvokeFunction'],
    }));

    var newRole = new Role(this, 'NewRole', {
      assumedBy: new ServicePrincipal('ec2.amazonaws.com')
    });
    
    // const existingUser = User.fromUserName(this, 'daniel', 'daniel');
  }
}
