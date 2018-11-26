#!/bin/sh
#https://zhidao.baidu.com/question/714636440747136725.html
#echo $1

dep_path='/Users/xujian/Downloads/dependencies/'$1
echo $dep_path
if [ ! -d $dep_path ];then
    echo "创建目录" + $dep_path
    mkdir -p $dep_path
else
    echo $dep_path + "已存在"
fi

git add .
git commit -m "------"
git push -u origin master -f

