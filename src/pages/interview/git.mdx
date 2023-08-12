# Git 面试题

## git 与 svn 的区别在哪里

git 和 svn 最大的区别在于 git 是分布式的，而 svn 是集中式的。因此我们不能再离线的情况下使用 svn。如果服务器出现问题，我们就没有办法使用 svn 来提交我们的代码。

svn 中的分支是整个版本库的复制的一份完整目录，而 git 的分支是指针指向某次提交，因此 git 的分支创建更加开销更小并且分支上的变化不会影响到其他人。svn 的分支变化会影响到所有的人

## git pull 和 git fetch 的区别

git fetch 只是将远程仓库的变化下载下来，并没有和本地分支合并。<br/> git pull 会将远程仓库的变化下载下来，并和当前分支合并。`git pull` = `git fetch` + `git merge`

## git rebase 和 git merge 的区别

git merge 和 git rebase 都是用于分支合并，关键在 commit 记录的处理上不同。

git merge 会新建一个新的 commit 对象，然后两个分支以前的 commit 记录都指向这个新 commit 记录。这种方法会保留之前每个分支的 commit 历史。

git rebase 会先找到两个分支的第一个共同的 commit 祖先记录，然后将提取当前分支这之后的所有 commit 记录，然后将这个 commit 记录添加到目标分支的最新提交后面。经过这个合并后，两个分支合并后的 commit 记录就变为了线性的记录了。

## 项目另一条分支出现 BUG 了，你怎么办?

如果你当前分支工作还没做完，又不想提交，那么可以使用`git stash`，然后使用`git checkout 分支名`切换分支修复 bug，再切回来使用`git stash pop`

## 撤销已经提交的文件?

`git checkout .`

git checkout 除了创建切换分支的功能还有撤销的功能，为避免混淆，git2.x 版本推出了`git switch` 来代替 `git checkout` 切换分支的功能

## 撤销 add 和 commit ?

> 撤销 add

**`git reset HEAD .`**

> 撤销 commit

**`git reset --soft HEAD^`**

## 提交代码冲突了这么解决？如何避免冲突?

先备份自己的代码，再手动解决冲突的代码，再把自己的代码加回去。重新推送，避免冲突要养成好习惯，推送之前先`git pull`下拉取最新代码，冲突的原因往往是因为不同人员对同一地方进行了修改，git 不知道怎么办。

## git submodule

> Git 的 submodule 功能就是建立了当前项目与子模块之间的依赖关系：子模块路径、子模块的远程仓库、子模块的版本号
