---
layout: post
title: "Localhost will inevitably die"
author: Lucas Fernandes da Costa
place: San Francisco, United States
flag: 🇺🇸
tags: localhost remote dev environments
---

Localhost is the inevitable victim of every software's commercial success.

Assume you're a fintech running a Ruby on Rails monolith. If you ever get to PMF, you'll inevitably have to scale to process more transactions, or you'll have to hire more engineers to build ancillary features.

When that happens, you'll have to break your monolith into microservices so it scales more efficiently or so that multiple teams can deploy software without stepping on each other's toes.

Or someone in your company may have gone to too many AWS conferences and may want to sprinkle some lambdas here and there. _"It's scalable"_, they'll say.

As that happens, there will be a point of no return in which engineers can't run the whole system on their machines anymore — at least not in a reliable way.

<br />

# The beginning of the end: pointing to staging

First, engineers create huge Google Docs or Markdown files with complex instructions for running the software reliably.

Then, they'll run into all sorts of bugs they can only catch once the software gets deployed to staging.

Finally, there will be a day when a brilliant engineer will be sick of "works in my machine" types of bugs and will stop trying to run the whole system on `localhost`.

Instead, they'll run a single application on their machine and point it to _staging_. That's what happens in most companies today.

By pointing to _staging_, engineers can:

1. **Avoid bugs** by testing their application against a production-like environment
2. **Ship faster** by avoiding going through the hassle of setting things up multiple times
3. **Save their machine's resources for running meaningful software** and avoid their laptop fans sounding like a Boeing 737

The problem with "pointing to staging" is that it will only work well until the next few smart developers start doing the same.

As more people share staging, they will start stepping on each other's toes. Maybe they'll mess up the data someone's using for developing their features, or their workers will begin picking up messages from each other, preventing anyone from testing anything properly.

Developers may even accidentally run migrations against the staging database in more dire scenarios. When that happens, they'll effectively break staging, and no one else will be able to use it, bringing the team to a grinding halt.

That's when the CTO will step in to solve the problem and give each engineer their environment in the cloud. That's what companies like Shopify, Uber, and Stripe already do.

<br />

# Cloud environments: the good, the bad, and the ugly

There are three ways to kill localhost: give engineers big virtual machines, use off-the-shelf solutions supporting some types of infra, or truly replicate production-like environments.

<br />

## The ugly: big machines somewhere else

The worst way to replace `localhost` is by giving each engineer a large virtual machine in the cloud, like most solutions do.

Giving engineers a powerful virtual machine may allow them to run the whole software there and skip complicated setup processes. Still, it doesn't eliminate "works on my machine" problems.

Sure, engineers can now run `minikube` with a bazillion nodes, but they still can't run lambdas or any serverless components.

Minikube is also significantly different from having an actual EKS and may not support many features that EKS does.

Additionally, I hate the idea of running my text editor remotely or being given a shell somewhere else. I want to use my own tools. They were never the bottleneck anyway.

These types of solutions will inevitably fail because bugs will continue to happen, and some developers will refuse to move all their workflows and tools to these environments, causing a divide.

In any case, it's better to give engineers large machines somewhere else than to give them no alternative. Especially considering that these virtual machines are easy to set-up, they may be an _okay_ starting point, even if suboptimal.

<br />

## The bad: constrained remote infrastructure

Other types of solutions aim to give engineers a large namespace in a remote cluster to which they can sync local code.

Giving engineers remote infrastructure is a better approach because it assumes engineers will still run most of their development tools locally. That way, there's not as much divide between developers.

Still, these solutions heavily focus on a particular type of infrastructure — usually Kubernetes.

Consequently, these tools will inevitably fail too, because developers will still run into "works on my machine" types of bugs as they can't simulate Lambdas, S3 buckets, or SQS queues.

Additionally, it's worth noting that many of these tools are illusory. They'll say they give you a namespace in the cloud, but it's just a large node with a generic local cluster.

In case you're using exclusively Kubernetes, and there aren't too many advanced features of the control plane you rely on, these solutions may also be good enough, even though their abstractions are limiting.


<br />

## The good: production-like infrastructure

There's only one way to effectively kill `localhost` and live to tell the story: to provide a production-like staging for each engineer in the company's cloud.

This approach is far superior to the others because:

1. It completely eliminates "it works on my machine" types of problems or brings them to a frequency close to 0.
2. Engineers can still run all their tools locally.
3. Teams take advantage of their savings plans, run everything behind a VPN, and control permissions whichever way they prefer.

One way to do this is to use [Terraform workspaces](https://developer.hashicorp.com/terraform/language/state/workspaces).

The problem with using Terraform workspaces is that you'll have to replicate the whole infrastructure every time. Consequently, each environment would be significantly expensive and time-consuming to spin up.

For example, assume you will spin up a brand new EKS for each engineer. In that case, every development environment would take 15 to 20 minutes to come up, and each cluster would cost $72. In a team of 10 engineers, that's $720 and at least 2.5 hours completely wasted.

<br />

<img style="margin-bottom: -18px; max-height: 500px;" src="/assets/death-of-localhost/multi-cluster.png">

<br />

[Layerform](https://github.com/ergomake/layerform) solves this problem by allowing teams to build their own development infrastructure while reusing core infrastructure.

> For full disclosure, I'm the author of [Layerform](https://github.com/ergomake/layerform), so I'm biased as I trust my approach is the most adequate.

With Layerform, teams can quickly spin up their own isolated workspaces on top of a shared EKS cluster. If they have a Kafka instance, they can use that too and still have separate topics to consume messages from.

Additionally, Layerform supports _all_ types of infrastructure, meaning you can run Lambdas, S3 buckets, and SQS queues for each engineer.

<br />

<img style="margin-bottom: -18px; max-height: 500px;" src="/assets/death-of-localhost/dev-environments.png">

<br />

Solutions like Layerform and Terraform workspaces may be more time-consuming to set-up, but they will spin up resources on _your_ cloud, meaning you get to take advantage of your savings plans and have infrastructure that's as close to production as you want.

<br />

# Other uses for production-like remote environments

Besides developing, engineers can use remote environments as targets for their end-to-end and load tests. Given these environments behave just like production, they'll have more confidence that their code will work when deployed.

Creating remote production-like environments is also helpful for collaborating with others and doing manual tests. Whenever an engineer wants to show their work to a PM or ask QAs to run exploratory testing, the engineer could just run a command and share a link.

GitOps fanatics could take things one step further and integrate production-like environments into their GitHub actions to get a new environment and preview link for every pull request.

<br />

<img style="margin-bottom: -18px; max-height: 500px;" src="/assets/death-of-localhost/preview-link-layerform.png">

