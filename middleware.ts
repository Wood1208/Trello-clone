import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
// import { NextResponse } from 'next/server'

//添加新的公共路由
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/'])

export default clerkMiddleware((auth, request) => {

  if (!isPublicRoute(request)) {
    auth().protect(); // 如果不是公共路由，保护该路由
  }

}) //w(ﾟДﾟ)w更新这么快

// export default authMiddleware({
//   publicRoutes: ["/"],
//   afterAuth(auth, req) {
//     if (auth.userId && auth.isPublicRoute) {
//       let path = "/select-org";
  
//       if (auth.orgId) {
//         path = `/organization/${auth.orgId}`;
//       }
  
//       const orgSelection = new URL(path, req.url);
//       return NextResponse.redirect(orgSelection); // 返回重定向响应
//     }
  
//     if(!auth.userId && !auth.isPublicRoute) {
//       return redirectToSignIn({ returnBackUrl: req.url });
//     }
  
//     if(auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org") {
//       const orgSelection = new URL("/select-org", req.url);
//       return NextResponse.redirect(orgSelection);
//     }
//   }
// })



export const config = {
  matcher: [
    // 跳过 Next.js 的内部路由和所有静态文件
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // 始终运行 API 路由
    '/(api|trpc)(.*)',
  ],
}
