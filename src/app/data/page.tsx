'use client'; // 客户端组件，用于演示交互功能

import {useState} from "react";

export default function DataPage() {


    return (
        <div>
        <h1> 数据页面 </h1>
        <h1>独立更新的计数器</h1>
        <MyButton />

        </div>
    );
}


function MyButton() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    return (
        <button onClick={handleClick}>
            点了 {count} 次
        </button>
    );
}