# 설명

테스트 빌드: https://ourtetration.hyri.xyz/

DMTPARK님의 mytetration의 웹 구현 버전입니다. Svelte를 이용하여 구현하였습니다.
Desktop(>=768px)와 Mobile(<768px)를 모두 지원합니다.
기본 크기는 854 \* 480이며, 임의적으로 조정할 수 있습니다.

## 목적

Python 사용이 어렵거나 Desktop 환경을 이용하기 힘든 사람들의 접근성을 높입니다.

## 구현 범위

1. 동일한 알고리즘 탑재
   mytetration의 알고리즘을 자바스크립트로 이식하였습니다.
   또한 panda는 자바스크립트로 재구현하였으며, matplotlib의 시각화 부분은 canvas로 구현하였습니다.

2. x0, y0, eps, n, ratio 설정 기능
   동일한 알고리즘을 탑재하였기에 동일한 변수를 이용하여 조작이 가능합니다.
   (max_iter, escape_radius, threshold도 수정 가능합니다.)

## 추가 기능

1. 기본 배경색
   실시간으로 렌더하기에 렌더된 부분과 렌더되지 않은 부분의 구별을 위해 추가되었습니다.
   라이트 모드에서는 classic gray(#808080), 다크 모드에서는 dark gray(#505050)으로 칠해집니다.

2. 랜덤 렌더 기능

- 추가: 개발 초기에는 순차 렌더 속도가 매우 느려 유용하였지만,
  알고리즘 최적화 및 반복문 성능 개선 작업으로 인해 고화질이 아닌 경우
  두 렌더 방식 간에 속도 차이가 크지 않습니다.

  웹 특성상 로컬에서 실행하는 프로그램 대비 속도 제한 & 시간 제한이 있기에
  순차적으로 렌더하지 않고 임의의 픽셀을 선택하여 전체적으로 렌더합니다.

  장점: 높은 화질(n)을 설정한 경우 단기간에 윤곽을 확인할 수 있습니다.
  단점: 노이즈가 발생하여 퀄리티가 떨어집니다.

3. 알고리즘 최적화 (threshold 적용)
   mytetration#6 이슈를 참고하여 수렴 여부를 빠르게 판단합니다.

4. 복사 기능
   Copy 버튼을 이용해 쉽게 #mytetration 챌린지 문구를 복사할 수 있습니다.

## 추후 추가 예정 기능

- localstorage에 설정값 저장
- 포인터로 좌푯값 확인 기능
- 확대 애니메이션 기능
- 클릭하여 확대 기능

## 스크린샷

1. 랜덤 렌더 적용
   <img width="1552" alt="Screenshot 2024-05-25 at 22 03 15" src="https://github.com/Hyrri/ourtetration/assets/156367375/dc70da15-5e8b-44ef-bb2c-b3bbc8792789">

2. 순차 렌더 적용
   <img width="1552" alt="Screenshot 2024-05-25 at 22 02 40" src="https://github.com/Hyrri/ourtetration/assets/156367375/3497764e-aac3-413e-8e92-898fb35d91e5">


