// export REPLICATE_TOKEN=[token] 

curl -s -X POST \
     -H "Authorization: Token $REPLICATE_API_TOKEN" \
     -H 'Content-Type: application/json' \
     -d '{
         "version": "e22e77495f2fb83c34d5fae2ad8ab63c0a87b6b573b6208e1535b23b89ea66d6",
         "input": {
             "max_frames": "30"
         }
     }' \
     "https://api.replicate.com/v1/predictions" | jq


// curl -s -H "Authorization: Token $REPLICATE_API_TOKEN" \
//      -H 'Content-Type: application/json' \
//      "https://api.replicate.com/v1/predictions/j6t4en2gxjbnvnmxim7ylcyihu" | jq "{id, input, output, status}"