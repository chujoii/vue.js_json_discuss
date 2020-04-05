#!/bin/sh

echo please wait ~ 7 minutes

rm -f test_parser.json test_render.json

# for old bash:
#for i in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16

date +'%F %H:%M:%S'
echo generate test_parser.json
# for bash version 3.0+
for i in {1..100}
do
    cat example.json >> test_parser_100.json
done

for i in {1..1000}
do
    cat test_parser_100.json >> test_parser.json
done
rm -f test_parser_100.json

date +'%F %H:%M:%S'
echo generate test_render.json
for i in {1..100000}
do
    echo \"user\": \"`pwgen -A -0 -1`\" >> test_render.json
done
date +'%F %H:%M:%S'
