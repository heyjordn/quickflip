import test from "ava";
import nock from "nock";
import { assert } from "chai";

import { findQuickFlipYamlFile } from "../src/utils/importYaml.ts";

test("It can fetch and parse yaml from a github url while preserving spaces", async (t) => {
    const path = "";
    const owner = "heyjordn";
    const repo = "quickflip-sample";

    const expectedParsedYaml = [{
      index: 1,
      question: 'What is the capital of Jamaica?\n' +
        'The Answer should follow and preserve line breaks\n',
      answer: 'The Answer is:\nKingston\n'
    }];

    nock("https://api.github.com")
        .get(`/repos/${owner}/${repo}/contents/`)
        .reply(200, [{
            name: 'quickflip.yaml',
            path: 'quickflip.yaml',
            type: "file",
            download_url: 'https://raw.githubusercontent.com/heyjordn/quickflip-example/master/quickflip.yaml',
        }]);

    nock("https://raw.githubusercontent.com")
        .get("/heyjordn/quickflip-example/master/quickflip.yaml")
        .reply(200,

// Template strings take the literal space, therefore dont indent in source for formatting
`
- index: 1
  question: | 
    What is the capital of Jamaica?
    The Answer should follow and preserve line breaks
  answer: |
    The Answer is:
    Kingston
`
        ,{
            'Content-Type': 'text/yaml',
            'Content-Length': '245'
        })

    const results = await findQuickFlipYamlFile(owner, repo, path);
    
    assert.deepEqual(results, expectedParsedYaml);
    assert.isArray(results);
})