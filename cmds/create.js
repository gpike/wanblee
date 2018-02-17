/* create commander component
 * To use add require('../cmds/create.js')(program) to your commander.js based node executable before program.parse
 */
'use strict'
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
//var reg = /^(private|public-read|public-read-write|authenticated-read)$/i;

module.exports = function(program) {
    program
        .command('create <bucket>')
        .option(
            '-a, --acl <type>',
            'Add the specified type of acl [private public-read public-read-write authenticated-read]',
            'public-read'
        )
        .option(
            '-l, --location <type>',
            'Specify location other than US standard (EU | eu-west-1 | us-west-1 | us-west-2 | ap-south-1 | ap-southeast-1 | ap-southeast-2 | ap-northeast-1 | sa-east-1 | cn-north-1 | eu-central-1'
        )
        .parse(process.argv)
        .version('0.0.1')
        .description('Create an S3 bucket and enabled via Cloudfront')
        .action(function(bucket, options) {
            // console.log(
            //     `Bucket=${bucket} Acl=${options.acl} Location=${
            //         options.location
            //     }`
            // )

            var acl = 'public-read'
            if (options.acl) acl = options.acl

            var params = {
                Bucket: bucket,
                ACL: acl
            }

            if (options.location)
                params.CreateBucketConfiguration = {
                    LocationConstraint: options.location
                }

            // console.log('params = ' + JSON.stringify(params))
            s3.createBucket(params, function(err, data) {
              if (err) console.log(err, err.stack); // an error occurred
              else     console.log(data);           // successful response
              /*
              data = {
               Location: "http://examplebucket.s3.amazonaws.com/"
              }
              */
            });
        })
}
