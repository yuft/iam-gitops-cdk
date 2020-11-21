#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { IamPipelineStack } from '../lib/iam-pipeline-stack';

const app = new cdk.App();
new IamPipelineStack(app, 'IamPipelineStack');
app.synth();
