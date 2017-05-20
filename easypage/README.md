jQuery前端分页插件
使用方法：
将css和js分别引入
eg:
 $('.test li').easyPage({
    count: 5,
    color: [
          {
            "background":"#444","color":"#fff","border-color":"#444"
          },
          {
            "background":"#fff","color":"#444","border-color":"#ccc"
          },
          {
            "background":"#eee","color":"#444","border-color":"#ccc"
          }
        ]
  });
.test li 即是要进行分页的元素
参数count和可选的
count默认值为4
color中三个选项分别为：被选中时的样式、未被选择时的样式和hover的样式
