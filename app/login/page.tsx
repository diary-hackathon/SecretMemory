import React from 'react';

import LoginForm from "@/components/LoginForm"

export default function LoginPage({
  searchParams
}: {
  searchParams: { message: string }
}) {
  return (
    <div className="flex h-screen">
      {/* 左側の説明部分 */}
      
      <div className="flex-1 bg-customRed text-white">
        <div className="text-4xl mb-4 font-sacramento text-white text-center p-12 ">Secret Memory</div>
        <img src="https://cdn.glitch.global/4c0c94a2-9f5f-4698-8dcd-6d4403259f05/%E2%80%9C%E5%90%8D%E7%A7%B0%E6%9C%AA%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%83%86%E3%82%99%E3%82%B5%E3%82%99%E3%82%A4%E3%83%B3%20(4)%E2%80%9D%E3%81%AE%E8%83%8C%E6%99%AF%E3%81%8B%E3%82%99%E5%89%8A%E9%99%A4%E3%81%95%E3%82%8C%E3%81%BE%E3%81%97%E3%81%9F.png?v=1699081150229" alt="Secret Memory" className="mx-auto"></img>
        <p className="text-lg text-center p-12 font-bold">
          Secret Memoryは今日あったことを記録し、自分と向き合う日記アプリです。<br/>
          今日の出来事や感じたことを日記にありのままに書くのも良し。<br/>
          質問に答えて自分の内面と向き合うのも良し。<br/>
          あなただけの空間をぜひお楽しみください。<br/>
        </p>
      </div>

      {/* 右側のログインフォーム */}
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full max-w-md p-8">
          <LoginForm errorMessage={searchParams.message} />
        </div>
      </div>
    </div>
  );
};