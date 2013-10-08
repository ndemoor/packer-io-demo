ICAB Tech Talk #4 Demo App 
==========================

Code repository accompanying the ICAB Tech Talk.
The node.js application was forked from another repository: ![AWS-UGB-PhotoApp](https://github.com/ndemoor/AWS-UGB-PhotoApp)

Description:
------------

We provision an AMI through packer.io to deploy a NodeJS web application from scratch.

Don't forget to upload images to `photos` folder in the created S3 bucket.


If all is well you should be able to visit the webapp at the root of your instance ip and see something like this:

![Screenshot](https://raw.github.com/ndemoor/AWS-UGB-PhotoApp/master/Screenshot.png)
