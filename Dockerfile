# 使用官方的 Node.js 镜像作为基础镜像
FROM node:latest

# 设置工作目录
WORKDIR /app

# 复制应用程序的代码到镜像中
COPY . /app


# 安装应用程序的依赖
RUN npm install

# 暴露应用程序运行的端口
EXPOSE 7003

# 启动应用程序
CMD ["npm", "start"]
