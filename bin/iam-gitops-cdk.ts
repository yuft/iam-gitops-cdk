#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { IamGitopsCdkStack } from '../lib/iam-gitops-cdk-stack';

const app = new cdk.App();
new IamGitopsCdkStack(app, 'IamGitopsCdkStack');
