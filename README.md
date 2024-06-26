# 설명

테스트 빌드: https://ourtetration.hyri.xyz/

**본 프로젝트는 제 개인 프로젝트가 아닌, DMTPARK님의 mytetration의 웹 구현 버전입니다.**

Svelte를 이용하여 구현하였으며 데스크톱 환경와 모바일 환경을 모두 지원합니다. 기본 생성 크기는 854 \* 480이며, 임의적으로 조정할 수 있습니다.

## 경고

그래프의 시각화에 이용되는 Power(거듭제곱) 연산은 JS에서 가장 무거운 연산 중 하나이므로 모바일 기기의 경우 배터리 소모가 빠르며, 단시간의 이용에도 발열이 발생합니다. 따라서 시원한 환경과 전원 공급이 가능한 환경에서 사용하시기를 권장드립니다.

## 목적

Python 사용이 어렵거나 Desktop 환경을 이용하기 힘든 사람들의 접근성을 높이며, PTF의 아름다움을 최대한 많은 사람들이 쉽게 느낄 수 있도록 합니다.

## 구현 범위

1. 동일한 알고리즘 탑재: 
   mytetration의 알고리즘을 자바스크립트로 이식하였습니다.
   또한 panda는 자바스크립트로 재구현하였으며, matplotlib의 시각화 부분은 canvas로 구현하였습니다.

2. x0, y0, eps, n, ratio 설정 기능: 
   동일한 알고리즘을 탑재하였기에 동일한 변수를 이용하여 조작이 가능합니다.
   (max_iter, escape_radius, threshold도 Advanced에서 수정 가능합니다.)

## 추가 기능

0. 실시간 반영: 
   연산을 완료하고 결과를 보여주지 않고, 화면에 실시간으로 그래프를 그려냅니다. 

2. 기본 배경색: 
   실시간으로 렌더하므로 렌더된 부분과 렌더되지 않은 부분의 구별을 위해 추가되었습니다.

   - 라이트 모드에서는 classic gray(#808080), 다크 모드에서는 dark gray(#505050)으로 칠해집니다.

3. 랜덤 렌더 기능: 
  웹 특성상 로컬에서 실행하는 프로그램 대비 속도 제한 & 시간 제한이 있기에
  순차적으로 렌더하지 않고 임의의 픽셀을 선택하여 전체적으로 렌더합니다.

   - 초반: 전체적인 개형을 보다 빠르게 얻어낼 수 있습니다. (랜덤 > 순차)
   - 후반: 노이즈가 심하며, 완성까지 시간이 오래 걸립니다. (순차 > 랜덤)

4. 알고리즘 최적화 (threshold 적용): 
   mytetration#6 이슈를 참고하여 수렴 여부를 빠르게 판단합니다.

5. 복사 기능: 
   Copy 버튼을 이용해 쉽게 #mytetration 챌린지 문구를 복사할 수 있습니다.

## 랜덤 렌더 기능 해제

`Use random_render 체크 해제` -> `Cancel Render 클릭` -> `Start Render 클릭`

## 추후 추가 예정 기능

- localstorage에 설정값을 저장하는 기능
- 포인터로 좌푯값을 확인하는 기능
- 확대 애니메이션 제작 기능
- 특정 부분을 클릭하여 확대하는 기능
- WebGPU를 이용한 가속 기능
- x0, y0, eps에 대한 History 기능
- 추가적인 알고리즘 최적화

## 버그

- 메모리 누수: 여러 번 렌더를 하는 경우 속도가 느려지는 현상이 발생합니다.

## 의존성

- 컴포넌트 디자인: huntabyte님이 포팅하신 shadcn-svelte
- 복소수 연산: lxsmnsyc님이 제작하신 fast-complex

## 스크린샷

1. 랜덤 렌더 적용
   <img width="1552" alt="Screenshot 2024-05-25 at 22 03 15" src="https://github.com/Hyrri/ourtetration/assets/156367375/dc70da15-5e8b-44ef-bb2c-b3bbc8792789">


2. 순차 렌더 적용
   <img width="1552" alt="Screenshot 2024-05-25 at 22 02 40" src="https://github.com/Hyrri/ourtetration/assets/156367375/3497764e-aac3-413e-8e92-898fb35d91e5">


## 모바일 스크린샷
   <img width="393" alt="IMG_8768" src="https://github.com/Hyrri/ourtetration/assets/156367375/400f9054-6ecd-43f1-98e3-d259f0667bf0">
      <img width="393" alt="IMG_8766" src="https://github.com/Hyrri/ourtetration/assets/156367375/61e14a80-ca0c-4c88-8ea5-0d936c7b00ff">

