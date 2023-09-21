// 1. 이미지 동적으로 200개 생성
// 2. 이미지 소스가 로딩이 될 때가 에러가 발생하는 시스템 이벤트 설정
// 3. 브라우저에서 마우스 움직일 때마다 마우스 좌표값 구하기
// 4. 특정 수치값을 백분율화 하는 로직처리
// 5. 이미지 소스가 모두 로딩되는 상태를 백분율로 변환

// 백분율 구하는 공식
// 현재 수치값 / 전체 수치값 * 100 (백분율)
// 현재 수치값 / 전체 수치값 * 200 (이백분율)

const num = 200;
const section = document.querySelector('section');
const aside = document.querySelector('aside');
const loadingNum = document.querySelector('aside p span');
const imgs = createImgs(section, num);
const delay = convertSpeed(aside);

// for (let i = 0; i <= 200; i++) {
// 	const img = document.createElement('img');
// 	const src = document.createAttribute('src');
// 	src.value = `img/pic${i}.jpg`;
// 	img.setAttributeNode(src);
// 	section.append(img);
// }

window.addEventListener('mousemove', (e) => {
	const Percent = getPercent(e, num);
	activation(imgs, Percent);

	// parseInt(숫자) : 실수에서 소수점 아래를 버려서 정수 반환
	// parseFloat(숫자) : 소수점 아래까지 있는 실수 반환
});

// 이벤트 정보 객체와 전체 갯수를 받아서
// 해당 숫자에 대한 백분율 반환 함수

function getPercent(e, num) {
	const curPos = e.pageX;
	const wid = window.innerWidth;
	return parseInt((curPos / wid) * num);
}

// 인수로 갯수를 받아서 동적으로 img 생성해주는 함수
function createImgs(target, num) {
	for (let i = 0; i < num; i++) {
		const img = document.createElement('img');
		const src = document.createAttribute('src');
		src.value = `img/pic${i}.jpg`;
		img.setAttributeNode(src);
		target.append(img);
	}
	const imgs = target.querySelectorAll('img');
	let count = 0;
	imgs.forEach((img) => {
		img.onload = () => {
			count++;
			const percent = parseInt((count / num) * 100);
			loadingNum.innerText = percent;
			// console.log('현재 로딩된 소스이미지', count);
			if (count === num) {
				// 동적으로 만들어진 img 요소의 소스이미지가 렌더링 완료된 시점
				console.log('모든 소스이미지 로딩 완료');
				aside.classList.add('off');
				setTimeout(() => {
					aside.remove();
				}, delay);
			}
		};
	});
	return imgs;
}

// 인수로 transition-duration 값을 구해야 되는 DOM
function convertSpeed(el) {
	// 해당요소의 transition-duration값을 재연산해서 가져온다음
	// 숫자로 바꾸고 *1000을 해서 밀리세컨드 형태로 반환
	const result = getComputedStyle(el).transitionDuration;
	return result * 1000;
}

// 인수로 그룹유사배열, 활성화 순번을 받아서
// 해당 순번이 요소만 활성화처리
function activation(arr, index) {
	arr.forEach((el) => (el.style.display = 'none'));
	arr[index].style.display = 'block';
}
