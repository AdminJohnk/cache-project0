import React, { Component } from 'react'
import './MainContent.css'
import PAaddress_Direct from './PAaddress_Direct'
import MainMemoryLine from './MainMemoryLine'
import MainMemory from './MainMemory'
import CacheMemoryLine from './CacheMemoryLine'
import CacheMemory from './CacheMemory'

function getID(id) {
 return document.getElementById(id)
}
function log2(n) {
 return Math.log(n) / Math.log(2)
}
// Hàm kiểm tra là số nguyên dương
function isInteger(n) {
 return n % 1 === 0 && n > 0
}




export default class MainContent extends Component {

 state = {
  cache_size: 0,
  memory_size: 0,
  offset_bits: 0,
 }


 data_current;
 PA_address;

 mainMemory;
 cacheMemory;

 miss = 0;
 hit = 0;

 // Trạng thái các nút
 submit_part1 = 'chuanhan';
 submit_part2 = 'chuanhan';
 random_button = 'chuanhan';

 lamRong = () => {
  let cache_index = log2(this.state.cache_size / Math.pow(2, this.state.offset_bits));
  let _PAaddress = log2(this.state.memory_size);
  let Tag_bits = _PAaddress - cache_index - this.state.offset_bits;

  if (!isInteger(Tag_bits) || !isInteger(cache_index) || !isInteger(this.state.offset_bits)) {
   return <tr className='tr_of_tbody'>
    <td id="tagbit">&nbsp;</td>
    <td id="indexbit">&nbsp;</td>
    <td id="offsetbit">&nbsp;</td>
   </tr>
  }
  else {
   return <tr className='tr_of_tbody'>
    <td id="tagbit">{Tag_bits}</td>
    <td id="indexbit">{cache_index}</td>
    <td id="offsetbit">{this.state.offset_bits}</td>
   </tr>
  }
 }

 // -------------------------------------------------

 render_memory_block = () => {
  // let soDong = this.state.memory_size / Math.pow(2, this.state.offset_bits);
  // let soCot = Math.pow(2, this.state.offset_bits);

  let soDong = this.mainMemory.numberOfBlock;
  let soCot = this.mainMemory.byteOfBlock;

  if (!isInteger(soDong) || !isInteger(soCot)) {
   return <tr></tr>
  }
  if (soDong === 0) {
   return <tr></tr>
  }

  // let arr = [];
  // for (let i = 0; i < soDong; i++) {
  //     let arr1 = [];
  //     for (let j = 0; j < soCot; j++) {
  //         arr1.push(<td id={'memory_block_col' + j}>B. {i} - K{j}</td>);
  //     }
  //     arr.push(<tr id={'memory_block_row' + i}> {arr1} </tr>);
  // }

  let arr = [];
  for (let i = 0; i < soDong; i++) {
   let arr1 = [];
   for (let j = 0; j < soCot; j++) {
    arr1.push(<td id={'memory_block_col' + j}>{this.mainMemory.Array[i].buffer[j]}</td>);
   }
   arr.push(<tr id={'memory_block_row' + i}> {arr1} </tr>);
  }

  return arr;
 }

 render_cache_table = () => {
  // let soDong = this.state.cache_size / Math.pow(2, this.state.offset_bits);

  let soDong = this.cacheMemory.numberOfLines;

  if (!isInteger(soDong)) {
   return <tr></tr>
  }
  if (soDong === 0) {
   return <tr></tr>
  }

  // let arr = [];
  // for (let i = 0; i < soDong; i++) {
  //     let arr1 = [];
  //     arr1.push(<td id='Index' className={"text-center position-relative"}>{i}</td>);
  //     arr1.push(<td id='Valid' className={"text-center position-relative"}>0</td>);
  //     arr1.push(<td id='Tag' className={"text-center position-relative"}>-</td>);
  //     arr1.push(<td id='Data' className={"text-center position-relative"}>0</td>);

  //     arr.push(<tr id={Number(i).toString(2)}> {arr1} </tr>);
  // }

  let arr = [];
  for (let i = 0; i < soDong; i++) {
   let arr1 = [];
   arr1.push(<td id='Index' className={"text-center position-relative"}>{this.cacheMemory.Array[i].index}</td>);
   arr1.push(<td id='Valid' className={"text-center position-relative"}>{this.cacheMemory.Array[i].valid}</td>);
   arr1.push(<td id='Tag' className={"text-center position-relative"}>{this.cacheMemory.Array[i].tagbit}</td>);
   arr1.push(<td id='Data' className={"text-center position-relative"}>{this.cacheMemory.Array[i].buffer}</td>);
   arr1.push(<td id='Dirty' className={"text-center position-relative"}>{this.cacheMemory.Array[i].DirtyBit}</td>);
   arr.push(<tr id={Number(i).toString(2)}> {arr1} </tr>);

  }
  return arr;
 }

 // -------------------------------------------------

 random_Detail = (start, end, number) => {
  let data = '';
  for (let i = 0; i < 10; i++) {
   let hexa = (Math.floor(Math.random() * (end + 0x1 - start)) + start).toString(16);
   data += hexa + ',';
  }
  data = data.slice(0, data.length - 1);

  let take;
  take = data.slice(0, number);
  data = data.slice(number + 1, data.length);
  getID('instruction__input').value = take;
  getID('instruction__data').value = data;
 }

 randomData = () => {
  // Khi đã chưa nhấn submit1 thì không cho random
  // Khi đã nhấn submit2 thì không cho random 
  if (this.submit_part1 === 'chuanhan') {
   return;
  }
  let PAaddress = log2(this.state.memory_size);

  // Các trường hợp
  if (PAaddress === 3) {
   this.random_Detail(0x1, 0x7, 1);
  }
  else if (PAaddress === 4) {
   this.random_Detail(0x8, 0xf, 1);
  }
  else if (PAaddress === 5) {
   this.random_Detail(0x10, 0x1f, 2);
  }
  else if (PAaddress === 6) {
   this.random_Detail(0x20, 0x3f, 2);
  }
  else if (PAaddress === 7) {
   this.random_Detail(0x40, 0x7f, 2);
  }
  else if (PAaddress === 8) {
   this.random_Detail(0x80, 0xff, 2);
  }
  else if (PAaddress === 9) {
   this.random_Detail(0x100, 0x1ff, 3);
  }
  else if (PAaddress === 10) {
   this.random_Detail(0x200, 0x3ff, 3);
  }
  else if (PAaddress === 11) {
   this.random_Detail(0x400, 0x7ff, 3);
  }
  else if (PAaddress === 12) {
   this.random_Detail(0x800, 0xfff, 3);
  }
 }

 createMainMemory = () => {
  // Tạo main memory
  let soDong = this.state.memory_size / Math.pow(2, this.state.offset_bits);
  let soCot = Math.pow(2, this.state.offset_bits);
  let array = []; // Mảng chứa các dòng
  // Tạo các dòng trong main memory
  for (let i = 0; i < soDong; i++) {
   let buffer = []; // nội dung của 1 dòng là 1 mảng n phần tử
   for (let j = 0; j < soCot; j++) {
    buffer.push(`B. ${i} - K${j}`);
   }
   let mainMemoryLine = new MainMemoryLine(i, buffer);
   array.push(mainMemoryLine);
  }
  this.mainMemory = new MainMemory(soDong, array, 0, soCot);
  // console.log(this.mainMemory);

 }

 createCacheMemory = () => {
  // Tạo cache memory
  let soDong = this.state.cache_size / Math.pow(2, this.state.offset_bits);
  // let soCot = Math.pow(2, this.state.offset_bits);
  let array = []; // Mảng chứa các dòng
  for (let i = 0; i < soDong; i++) {
   let cacheMemoryLine = new CacheMemoryLine(i, 0, 0, '-', 0);
   array.push(cacheMemoryLine);
  }
  this.cacheMemory = new CacheMemory(soDong, array, 0);
  // console.log(this.cacheMemory);
 }

 checkValidInput = (Cache_size, Memory_size, Offset_bits) => {
  // Nếu cache size không phải là bội số của 2
  let x = log2(Cache_size);
  let y = log2(Memory_size);
  if (!isInteger(x) || !isInteger(y)) {
   alert('Cache, Memory and Offset must be in power of two');
   return false;
  }

  // Nếu giá trị đầu vào không hợp lệ
  let cache_index = log2(Cache_size / Math.pow(2, Offset_bits));
  let PAaddress = log2(Memory_size);
  let Tag_bits = PAaddress - cache_index - Offset_bits;
  if (!isInteger(cache_index) || !isInteger(Tag_bits) || !isInteger(PAaddress)) {
   alert('Invalid value');
   return false;
  }
  return true;
 }

 // Chỉnh các nút

 configReset = () => {
  // Chỉnh mấy cái ô
  getID('cache_size').readOnly = false;
  getID('memory_size').readOnly = false;
  getID('offset_bits').readOnly = false;
  getID('instruction__input').readOnly = false;

  // Chỉnh mấy cái nút
  getID('submit_part1').disabled = false;
  getID('random_Button').disabled = false;
  getID('submit_part2').disabled = false;
  getID('next_button').disabled = false;
  getID('fast_button').disabled = false;

  this.submit_part1 = 'chuanhan';
  this.submit_part2 = 'chuanhan';
  this.random_button = 'chuanhan';

  getID('cache_size').value = 16;
  getID('memory_size').value = 2048;
  getID('offset_bits').value = 2;

  getID('instruction__input').value = '';
  getID('instruction__data').value = '';

  // Chỉnh màu bảng nhỏ
  getID('caption__tag').style.backgroundColor = 'transparent';
  getID('caption__index').style.backgroundColor = 'transparent';
  getID('caption__ofsset').style.backgroundColor = 'transparent';
  getID('information_text').style.backgroundColor = 'transparent';

  // Chỉnh lại nội dung bảng nhỏ
  getID('caption__tag').innerHTML = 'TAG';
  getID('caption__index').innerHTML = 'INDEX';
  getID('caption__ofsset').innerHTML = 'OFFSET';

  // Chỉnh sửa lỷ lệ miss hit.
  this.hit = 0;
  this.miss = 0;

  document.getElementsByClassName('statistics')[0].style.backgroundColor = 'transparent';
  getID('hitRateLabel').innerHTML = '&nbsp';
  getID('missRateLabel').innerHTML = '&nbsp';
  getID('listOfInstructionsLabel').innerHTML = `<ul id='Status_Miss_hit'></ul>`;

  // Information
  getID('information_text').innerHTML = 'Please Configure Cache Settings.';

  this.setState({
   cache_size: 0,
   memory_size: 0,
   offset_bits: 0,
  })
 }

 configSubmit1 = () => {
  // Lấy 3 biến về
  let Cache_size = parseInt(getID('cache_size').value);
  let Memory_size = parseInt(getID('memory_size').value);
  let Offset_bits = parseInt(getID('offset_bits').value);

  // Kiểm tra giá trị đầu vào
  if (!this.checkValidInput(Cache_size, Memory_size, Offset_bits)) {
   return;
  }

  let cache_index1 = log2(Cache_size / Math.pow(2, Offset_bits));
  let PAaddress1 = log2(Memory_size);
  let Tag_bits1 = PAaddress1 - cache_index1 - Offset_bits;

  // Disable các input
  this.submit_part1 = 'danhan';
  getID('submit_part1').disabled = true;
  getID('cache_size').readOnly = true;
  getID('memory_size').readOnly = true;
  getID('offset_bits').readOnly = true;

  this.setState({
   cache_size: Cache_size,
   memory_size: Memory_size,
   offset_bits: Offset_bits,
  })

  getID('information_text').innerHTML = `
  Offset = ${Offset_bits} bits<br />
        Index bits = log<sub>2</sub>(${Cache_size}/${Math.pow(2, Offset_bits)}) = ${cache_index1} bits<br />
        Physical Address = log<sub>2</sub>(${Memory_size}) = ${PAaddress1} bits<br />
        Tag = ${PAaddress1} bits - ${cache_index1} bits - ${Offset_bits} bits = ${Tag_bits1} bits<br />
        Block = ${Tag_bits1} bits + ${cache_index1} bits = ${Tag_bits1 + cache_index1} bits<br /><br /> Please submit Instruction.
  `
 }

 configSubmit2 = (Tag_bits, cache_index) => {
  // Khi đã chưa nhấn submit1 thì không cho random hoặc input rỗng thì cũng ko chạy
  if (this.submit_part1 === 'chuanhan') {
   return;
  }

  // Lấy số nhị phân cần so sánh chiều dài
  let binary_number = getID('instruction__input').value.toString();
  binary_number = Number('0x' + binary_number).toString(2);
  // Lấy chiều dài
  let length = log2(this.state.memory_size);

  if (getID('instruction__input').value === '' || binary_number.length > length) {
   alert('Instruction is not valid. Please try again');
   return;
  }


  this.submit_part2 = 'danhan';
  getID('submit_part2').disabled = true;

  // Lấy dữ liệu số đang xét chuyển thành nhị phân
  this.data_current = getID('instruction__input').value;
  let binary = Number('0x' + this.data_current).toString(2);

  // Khởi tạo đối tượng PA_address với các thuộc tính tương ứng
  let _PAaddress = log2(this.state.memory_size);
  // Nếu độ dài không bằng thì thêm các số 0 vào trước binary cho đến khi bằng độ dài _PAaddress
  if (binary.length < _PAaddress) {
   let temp = '';
   for (let i = 0; i < _PAaddress - binary.length; i++) {
    temp += '0';
   }
   binary = temp + binary;
  }


  this.PA_address = new PAaddress_Direct(binary.slice(0, Tag_bits), binary.slice(Tag_bits, Tag_bits + cache_index), binary.slice(Tag_bits + cache_index, binary.length));


  // Thể hiện lên màn hình
  getID('caption__tag').innerHTML = this.PA_address.tag;
  getID('caption__index').innerHTML = this.PA_address.index;
  getID('caption__ofsset').innerHTML = this.PA_address.offset;

  getID('caption__tag').style.backgroundColor = '#29b5f6a8';
  getID('caption__index').style.backgroundColor = '#29b5f6a8';
  getID('caption__ofsset').style.backgroundColor = '#29b5f6a8';

  // Information
  getID('information_text').style.backgroundColor = '#29b5f6a8';
  getID('information_text').innerHTML = 'The instruction has been converted from hex to binary and allocated to tag, index, and offset respectively';
 }

 render() {
  let cache_index = log2(this.state.cache_size / Math.pow(2, this.state.offset_bits));
  let PAaddress = log2(this.state.memory_size);
  let Tag_bits = PAaddress - cache_index - this.state.offset_bits;
  let soLanNext = 0;
  let Miss_or_Hit = true;


  this.createMainMemory();
  this.createCacheMemory();

  return (
   <div className='container-fluid'>
    <div className='navbar'>
     <ul className="nav nav-pills">
      <li className="nav-item">
       <a className="nav-link" aria-current="page" href="a">Direct Mapped Cache</a>
      </li>
      <li className="nav-item">
       <a className="nav-link" href="a">Fully Associative Cache</a>
      </li>
      <li className="nav-item">
       <a className="nav-link" href="a">2-Way SA </a>
      </li>
      <li className="nav-item">
       <a className="nav-link" href="a">4-Way SA</a>
      </li>
     </ul>
    </div>
    <div className='row maincontent container-fluid'>
     <div className='col-3 mincol'>
      <div className='input'>
       <div className='row aline'>
        <div className='col-6'>
         <p className='name_element'>Cache Size</p>
        </div>
        <div className='col-6 inputtext'>
         <input id="cache_size" type="text" className="form-control" placeholder="bytes" defaultValue={16} />

        </div>
       </div>
       <div className='row aline'>
        <div className='col-6'>
         <p className='name_element'>Memory Size</p>
        </div>
        <div className='col-6 inputtext'>
         <input id='memory_size' type="text" className="form-control" placeholder="bytes" defaultValue="2048" />
        </div>
       </div>
       <div className='row aline'>
        <div className='col-6'>
         <p className='name_element'>Offset Bits</p>
        </div>
        <div className='col-6 inputtext'>
         <input id='offset_bits' type="text" className="form-control" placeholder="bits" defaultValue="2" />
        </div>
       </div>
       <div className='row aline__button'>
        <div className='col-6'>
         <button type="button" className="btn btn-primary" onClick={this.configReset}>Reset</button>
        </div>
        <div className='col-6'>
         <button id='submit_part1' type="button" className="btn btn-primary" onClick={() => {
          this.configSubmit1();
         }}>Submit</button>
        </div>
       </div>
       <hr />
      </div>

      <div className='instruction'>
       <h3 className='instruction__title'>Instruction</h3>
       <div className='row'>
        <div className='col-6 instruction__col6'>
         <select className="form-select instruction__select" aria-label="Default select example" style={{ fontSize: "15px" }}>
          <option value={1}>Load</option>
          <option value={2}>Store</option>
         </select>
        </div>
        <div className='col-6'>
         <div className='col-6 instruction__inputtext inputtext'>
          <input id='instruction__input' type="text" className="form-control" />
         </div>
        </div>
       </div>
       <div className='instruction__inputtext inputtext mt-2'>
        <input id='instruction__data' type="text" className="form-control" placeholder="List of next 10 Instructions" />
       </div>
       <div className='row aline__button mt-2'>
        <div className='col-6'>
         <button id='random_Button' type="button" className="btn btn-primary" onClick={this.randomData}>Gen. Random</button>
        </div>
        <div className='col-6'>
         <button id='submit_part2' type="button" className="btn btn-primary" onClick={() => {
          this.configSubmit2(Tag_bits, cache_index);
         }} >Submit</button>
        </div>
       </div>
       <hr />
      </div>
      <div className='information'>
       <h3 className='instruction__title'>Information</h3>
       <div id="information_text" className="col-sm-12 col-md-12 information_text">
        Please Configure Cache Settings.
       </div>
       <div className='row aline__button mt-2'>
        <div className='col-6'>
         <button id='next_button' type="button" className="btn btn-primary" onClick={() => {
          if (this.submit_part2 === 'chuanhan') {
           alert('Please submit Instruction.');
           return;
          }

          // Lấy dòng trùng với cache index đang chọn trên giao diện
          let data_ = this.PA_address.index;
          data_ = Number(data_).toString(10).toString(2);
          let current_row = getID(data_);

          // Đánh dấu dòng nào đang chọn trong bộ nhớ cache_
          let decimal = Number(parseInt(data_, 2));
          this.cacheMemory.currentIndex = decimal;

          // 4 cột trong cache table
          let valid = current_row.querySelector('#Valid');
          let tag = current_row.querySelector('#Tag');
          let index = current_row.querySelector('#Index');
          let data = current_row.querySelector('#Data');
          let dirty = current_row.querySelector('#Dirty');




          if (soLanNext === 0) {
           // Set màu cho bảng nhỏ
           getID('caption__index').style.backgroundColor = '#ff5c8dc7';

           getID('caption__tag').style.backgroundColor = 'transparent';
           getID('caption__ofsset').style.backgroundColor = 'transparent';

           getID('information_text').style.backgroundColor = 'white';

           // Set màu cho bảng lớn
           index.style.backgroundColor = '#ff5c8dc7';
           valid.style.backgroundColor = '#ff5c8dc7';
           tag.style.backgroundColor = '#ff5c8dc7';
           data.style.backgroundColor = '#ff5c8dc7';
           dirty.style.backgroundColor = '#ff5c8dc7';

           // Information
           getID('information_text').innerHTML = 'Index requested will be searched in cache as highlighted in pink';
           getID('information_text').style.backgroundColor = '#ff5c8dc7';

           soLanNext++;
           return;
          }

          if (soLanNext === 1) {
           valid.style.backgroundColor = '#29b5f6a8';
           // if (valid.innerHTML === '0') {
           //  valid.classList.add('current_row_close');
           //  Miss_or_Hit = false;
           //  // Information
           //  getID('information_text').innerHTML = 'This line contains no data';
           // } else {
           //  valid.classList.add('current_row_tick');
           //  // Information
           //  getID('information_text').innerHTML = 'This line already contains data';
           // }

           // cache_
           if (this.cacheMemory.Array[this.cacheMemory.currentIndex].valid === 0) {
            valid.classList.add('current_row_close');
            // Information
            getID('information_text').innerHTML = 'This line contains no data';
           } else {
            valid.classList.add('current_row_tick');
            // Information
            getID('information_text').innerHTML = 'This line already contains data';
           }




           // Information
           getID('information_text').style.backgroundColor = '#29b5f6a8';

           soLanNext++;
           return;
          }
          if (soLanNext === 2) {
           tag.style.backgroundColor = '#29b5f6a8';
           getID('caption__tag').style.backgroundColor = '#29b5f6a8';
           // if (tag.innerHTML === '-' || tag.innerHTML !== getID('caption__tag').innerHTML) {
           //  tag.classList.add('current_row_close');
           //  Miss_or_Hit = false;
           //  // Information
           //  getID('information_text').innerHTML = 'This line does not match the tag';
           // } else {
           //  tag.classList.add('current_row_tick');
           //  // Information
           //  getID('information_text').innerHTML = 'This line match the tag';
           // }

           // cache_
           if (this.cacheMemory.Array[this.cacheMemory.currentIndex].tagbit !== getID('caption__tag').innerHTML) {
            tag.classList.add('current_row_close');
            // Information
            getID('information_text').innerHTML = 'This line does not match the tag';
           } else {
            tag.classList.add('current_row_tick');
            // Information
            getID('information_text').innerHTML = 'This line match the tag';
           }

           soLanNext++;
           return;
          }
          if (soLanNext === 3) {
           // cache_
           Miss_or_Hit = this.cacheMemory.missOrHit(getID('caption__tag').innerHTML);
           if (!Miss_or_Hit) {
            index.classList.add('Miss_After');
            // Information
            getID('information_text').innerHTML = 'Valid bit is 0 or tag does not match. This is a cache miss';
           } else {
            index.classList.add('Hit_After');
            // Information
            getID('information_text').innerHTML = 'Valid bit is 1 and tag matches. This is a cache hit';
           }
           soLanNext++;
           return;
          }
          if (soLanNext === 4) {
           // Đổi màu xanh cho 3 cột còn lại
           index.style.backgroundColor = '#29b5f6a8';
           data.style.backgroundColor = '#29b5f6a8';
           dirty.style.backgroundColor = '#29b5f6a8';

           getID('caption__index').style.backgroundColor = 'transparent';

           // Cho dấu màu đỏ/xanh biến mất
           valid.classList.remove('current_row_close');
           valid.classList.remove('current_row_tick');

           tag.classList.remove('current_row_close');
           tag.classList.remove('current_row_tick');

           index.classList.remove('Miss_After');
           index.classList.remove('Hit_After');

           // Chuỗi nhị phân của dòng đang chọn
           let binary_string = getID('caption__tag').innerHTML + getID('caption__index').innerHTML;
           let decimo_string = parseInt(binary_string, 2);




           // Set nội dung cho ô tag và valid
           // tag.innerHTML = getID('caption__tag').innerHTML;
           // valid.innerHTML = '1';

           // cache_
           this.cacheMemory.Array[this.cacheMemory.currentIndex].valid = 1;
           this.cacheMemory.Array[this.cacheMemory.currentIndex].tagbit = getID('caption__tag').innerHTML;
           tag.innerHTML = this.cacheMemory.Array[this.cacheMemory.currentIndex].tagbit;
           valid.innerHTML = this.cacheMemory.Array[this.cacheMemory.currentIndex].valid;



           // Set nội dung cho ô data
           // let xblock = Math.pow(2, this.state.offset_bits);
           // data.innerHTML = `BLOCK ${decimo_string} WORD 0 - ${xblock - 1}`;

           // cache_ 
           let xblock = Math.pow(2, this.state.offset_bits);
           this.cacheMemory.Array[this.cacheMemory.currentIndex].buffer = `BLOCK ${decimo_string} WORD 0 - ${xblock - 1}`;
           data.innerHTML = this.cacheMemory.Array[this.cacheMemory.currentIndex].buffer;

           getID(`memory_block_row${decimo_string}`).scrollIntoView();
           getID(`memory_block_row${decimo_string}`).style.backgroundColor = '#29b5f6a8';


           if (!Miss_or_Hit) {
            // Information
            let socot = Math.pow(2, this.state.offset_bits) - 1;
            getID('information_text').innerHTML = `Cache table is updated accordingly. Block ${decimo_string} with offset 0 to ${socot} is transferred to cache`;
            getID('information_text').style.backgroundColor = '#29b5f6a8';
           }


           soLanNext++;
           return;
          }
          if (soLanNext === 5) {

           getID('caption__tag').style.backgroundColor = 'transparent';

           // Chuỗi nhị phân của dòng đang chọn
           let binary_string = getID('caption__tag').innerHTML + getID('caption__index').innerHTML;
           let decimo_string = parseInt(binary_string, 2);

           // Xét lại màu cho các phần
           getID(`memory_block_row${decimo_string}`).style.backgroundColor = 'transparent';
           getID('information_text').style.backgroundColor = 'transparent';
           index.style.backgroundColor = 'transparent';
           valid.style.backgroundColor = 'transparent';
           tag.style.backgroundColor = 'transparent';
           data.style.backgroundColor = 'transparent';
           dirty.style.backgroundColor = 'transparent';

           // Xóa current_input và đẩy lên 1 input mới
           let data_string = getID('instruction__data');
           let input_string = getID('instruction__input');

           let previous_input = input_string.value;

           // next_current_input lấy từ data_string.value đến khi nào gặp dấu , thì dừng

           let vt = -1;
           for (let i = 0; i < data_string.value.length; i++) {
            if (data_string.value[i] === ',') {
             vt = i;
             break;
            }
           }
           if (vt === -1) {
            input_string.value = data_string.value;
            data_string.value = '';
           } else {
            input_string.value = data_string.value.slice(0, vt);
            data_string.value = data_string.value.slice(vt + 1);

           }

           input_string.focus();

           this.submit_part2 = 'chuanhan';
           getID('submit_part2').disabled = false;

           soLanNext = 0;

           // Tính toán tỷ lệ miss hit
           if (Miss_or_Hit === false) {
            this.miss++;
           } else {
            this.hit++;
           }

           let miss_rate = this.miss / (this.miss + this.hit) * 100;

           getID('missRateLabel').innerHTML = Math.round(miss_rate) + '%';
           getID('hitRateLabel').innerHTML = (100 - Math.round(miss_rate)) + '%';

           let x;
           if (Miss_or_Hit === false) {
            x = 'Miss';
           } else {
            x = 'Hit';
           }

           getID('Status_Miss_hit').innerHTML += `
                      <li>
                      Load ${previous_input.toString().toUpperCase()} [${x}]
                      </li>
                      `;

           // Tô màu tỷ lệ miss/hit
           let color = document.getElementsByClassName('statistics')[0];
           color.style.backgroundColor = '#FDD835';

           // Information
           getID('information_text').innerHTML = 'The cycle has been completed.Please submit another instructions';

           Miss_or_Hit = true;
           return;
          }

         }}>Next</button>
        </div>
        <div className='col-6'>
         <button id='fast_button' type="button" className="btn btn-primary" onClick={() => {
          if(this.submit_part2 === 'chuanhan'){
           alert('Please submit Instruction.');
           return;
          }
          Miss_or_Hit = this.cacheMemory.missOrHit(getID('caption__tag').innerHTML);
          // Lấy dòng trùng với cache index đang chọn trên giao diện
          let data_ = this.PA_address.index;
          data_ = Number(data_).toString(10).toString(2);
          let current_row = getID(data_);

          // Đánh dấu dòng nào đang chọn trong bộ nhớ cache_
          let decimal = Number(parseInt(data_, 2));
          this.cacheMemory.currentIndex = decimal;

          // 4 cột trong cache table
          let valid = current_row.querySelector('#Valid');
          let tag = current_row.querySelector('#Tag');
          let index = current_row.querySelector('#Index');
          let data = current_row.querySelector('#Data');
          let dirty = current_row.querySelector('#Dirty');

          // Chuỗi nhị phân của dòng đang chọn
          let binary_string = getID('caption__tag').innerHTML + getID('caption__index').innerHTML;
          let decimo_string = parseInt(binary_string, 2);

          setTimeout(() => {
           getID(`memory_block_row${decimo_string}`).scrollIntoView();
           console.log('1');
          }, 1);
          

          // cache_
          this.cacheMemory.Array[this.cacheMemory.currentIndex].valid = 1;
          this.cacheMemory.Array[this.cacheMemory.currentIndex].tagbit = getID('caption__tag').innerHTML;
          tag.innerHTML = this.cacheMemory.Array[this.cacheMemory.currentIndex].tagbit;
          valid.innerHTML = this.cacheMemory.Array[this.cacheMemory.currentIndex].valid;

          // cache_ 
          let xblock = Math.pow(2, this.state.offset_bits);
          this.cacheMemory.Array[this.cacheMemory.currentIndex].buffer = `BLOCK ${decimo_string} WORD 0 - ${xblock - 1}`;
          data.innerHTML = this.cacheMemory.Array[this.cacheMemory.currentIndex].buffer;


          getID('caption__tag').style.backgroundColor = 'transparent';
          getID('caption__index').style.backgroundColor = 'transparent';
          getID('caption__ofsset').style.backgroundColor = 'transparent';

          index.style.backgroundColor = 'transparent';
          valid.style.backgroundColor = 'transparent';
          tag.style.backgroundColor = 'transparent';
          data.style.backgroundColor = 'transparent';
          dirty.style.backgroundColor = 'transparent';

          // Cho dấu màu đỏ/xanh biến mất
          valid.classList.remove('current_row_close');
          valid.classList.remove('current_row_tick');

          tag.classList.remove('current_row_close');
          tag.classList.remove('current_row_tick');

          index.classList.remove('Miss_After');
          index.classList.remove('Hit_After');

          // Xóa current_input và đẩy lên 1 input mới
          let data_string = getID('instruction__data');
          let input_string = getID('instruction__input');

          let previous_input = input_string.value;

          // next_current_input lấy từ data_string.value đến khi nào gặp dấu , thì dừng

          let vt = -1;
          for (let i = 0; i < data_string.value.length; i++) {
           if (data_string.value[i] === ',') {
            vt = i;
            break;
           }
          }
          if (vt === -1) {
           input_string.value = data_string.value;
           data_string.value = '';
          } else {
           input_string.value = data_string.value.slice(0, vt);
           data_string.value = data_string.value.slice(vt + 1);

          }

          input_string.focus();

          this.submit_part2 = 'chuanhan';
          getID('submit_part2').disabled = false;

          soLanNext = 0;

          // Tính toán tỷ lệ miss hit
          if (Miss_or_Hit === false) {
           this.miss++;
          } else {
           this.hit++;
          }

          let miss_rate = this.miss / (this.miss + this.hit) * 100;

          getID('missRateLabel').innerHTML = Math.round(miss_rate) + '%';
          getID('hitRateLabel').innerHTML = (100 - Math.round(miss_rate)) + '%';

          let x;
          if (!Miss_or_Hit) {
           x = 'Miss';
          } else {
           x = 'Hit';
          }

          getID('Status_Miss_hit').innerHTML += `<li>Load ${previous_input.toString().toUpperCase()} [${x}]</li>`;

          // Tô màu tỷ lệ miss/hit
          let color = document.getElementsByClassName('statistics')[0];
          color.style.backgroundColor = '#FDD835';

          // Information
          getID('information_text').innerHTML = 'The cycle has been completed.Please submit another instructions';
          getID('information_text').style.backgroundColor = 'transparent';
          
          Miss_or_Hit = true;
          return;
         }}>Fast Forward</button>
        </div>
       </div>
       <hr />
      </div>
      <div className='statistics'>
       <div>
        <b> Statistics </b> <br />
        <label className="col-xs-12 col-sm-6 ">Hit Rate  &nbsp; &nbsp;: </label>
        <label className="col-xs-12 col-sm-6" id="hitRateLabel">&nbsp;</label>
        <label className="col-xs-6 col-sm-6"> Miss Rate : </label>
        <label className="col-xs-6 col-sm-6" id="missRateLabel">&nbsp;</label>
        <b>	List of Previous Instructions :</b>
        <label className="col-xs-12 col-sm-12 " id="listOfInstructionsLabel">
         <ul id='Status_Miss_hit'></ul>
        </label>
       </div>

      </div>
     </div>
     <div className='col-9 maxcol'>
      <div className='header'>
       <h3 style={{ textAlign: "center" }}><i class="fa fa-sliders-h"></i>
        <font face="titleFont"> Direct Mapped Cache </font>
       </h3>
      </div>
      <div className='row maxcol__caculator'>
       <div className='col-5 instruction_breakdown'>
        <h3 className='instruction_breakdown_title'>
         <i class="fa fa-sign-in-alt"></i> Instruction Breakdown
        </h3>
        <table id="caption" className="caption table table-bordered border-primary">
         <thead>
          <tr id='caption__trhead' className='tr_of_thead'>
           <td id='caption__tag'>TAG</td>
           <td id='caption__index'>INDEX</td>
           <td id='caption__ofsset'>OFFSET</td>
          </tr>
         </thead>
         <tbody>
          {this.lamRong()}
         </tbody>
        </table>
       </div>
       <div className='col-7 memory_block'>
        <h3 className='memory_block_title'>
         <i class="fa fa-th-large"></i> Memory Block
        </h3>
        <div id="memoryTable" class="memoryTable">
         <table className='drawtable'>
          <tbody>
           {this.render_memory_block()}
          </tbody>
         </table>
        </div>
       </div>
       <div className='cache_table mt-3'>
        <h3 className='cache_table_title'>
         <i class="fa fa-table"></i> Cache Table
        </h3>
        <table class="drawtable table text-center" id="cachetable">
         <thead>
          <tr className='tr_of_thead'>
           <th className='text-center' style={{ width: '15%' }}> Index </th>
           <th className='text-center' style={{ width: '15%' }}> Valid </th>
           <th className='text-center' style={{ width: '15%' }}> Tag </th>
           <th className='text-center' style={{ width: '40%' }}> Data (Hex) </th>
           <th className='text-center' style={{ width: '15%' }}> Dirty Bit </th>
          </tr>
         </thead>
         <tbody>
          {this.render_cache_table()}
         </tbody>

        </table>
       </div>
      </div>
     </div>
    </div>
   </div>
  )
 }
}