import React from 'react';
import MemberListEditor from './MemberListEditor';
import { configure, mount  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
var expect = chai.expect;
configure({ adapter: new Adapter() });

var usersData = [{
  "_id": "BkASzcxadHPaL6Z6t",
  "firstName": "Benjamin",
  "lastName": "Towne",
  "email": "benjamin-towne@tenet-test.textexpander.com"
},
{
  "_id": "5X9iLNyuvXmnYkK4s",
  "firstName": "Kailey",
  "lastName": "Hodkiewicz",
  "email": "kailey-hodkiewicz@tenet-test.textexpander.com"
},{
  "_id": "QmLBwEtypedEPGwii",
  "firstName": "Sheridan",
  "lastName": "Doyle",
  "email": "sheridan-doyle@tenet-test.textexpander.com"
}];

let wrapper, editButton;

describe("<MemberListEditor />", ()=>{
  beforeEach(()=>{
    wrapper = mount((
        <MemberListEditor users={usersData}/>)
      );   
      
    editButton = wrapper.find('.edit-button');
  });

  it("render initial paragraph text", ()=>{
    expect(wrapper.html()).to.contain('No users in this list. Click on Edit Button to add members.');
  });

  it("render list of users available", ()=>{
    editButton.simulate("click");
    expect(wrapper.find(".user-item").length).to.equal(3);
    expect(wrapper.find('.list-head').first().find('.count').text()).to.equal('3');
    expect(wrapper.find("#users-available").html()).to.contain("Benjamin Towne");
    expect(wrapper.find("#users-available").html()).to.contain("Kailey Hodkiewicz");
    expect(wrapper.find("#users-available").html()).to.contain("Sheridan Doyle");
  });

  it("searches returns users filtered", ()=>{
    editButton.simulate("click");
    wrapper.find('.search-available').simulate('change', { target: { name: 'value', value: 'ben' } });
    expect(wrapper.find(".user-item").length).to.equal(1);
    expect(wrapper.find("#users-available").html()).to.contain("Benjamin");
    expect(wrapper.find("#users-available").html()).to.not.contain("Kailey");
  });

  it("count is updated when users are selected", ()=>{
    editButton.simulate("click");
    expect(wrapper.find('.list-head').first().html()).to.contain('0 Users Selected');
    wrapper.find(".user-item").at(0).simulate('click');
    expect(wrapper.find('.list-head').first().html()).to.contain('1 Users Selected');
    wrapper.find(".user-item").at(1).simulate('click');
    expect(wrapper.find('.list-head').first().html()).to.contain('2 Users Selected');
  });

  it("select all available users", ()=>{
    editButton.simulate("click");
    wrapper.find('.select-all-available-users').simulate('change', {target: {name: 'checked', value: true}});
    expect(wrapper.find('#users-available .selected')).to.have.lengthOf(3);
  });

  it("moves selected user to assigned list", ()=>{
    editButton.simulate("click");
    let userItem = wrapper.find(".user-item").first();
    userItem.simulate("click");
    wrapper.find(".add-user").simulate("click");
    expect(wrapper.find("#users-assigned").html()).to.contain("Benjamin");
    expect(wrapper.find("#users-assigned").html()).to.not.contain("Kailey");
    expect(wrapper.find("#users-available").html()).to.contain("Kailey");
    expect(wrapper.find("#users-available").html()).to.not.contain("Benjamin");
  });

  it("select all assigned users", ()=>{
    editButton.simulate("click");
    wrapper.find('.select-all-available-users').simulate('change', {target: {name: 'checked', value: true}});
    wrapper.find(".add-user").simulate("click");
    wrapper.find('.select-all-assigned-users').simulate('change', {target: {name: 'checked', value: true}});
    expect(wrapper.find('#users-available .selected')).to.have.lengthOf(0);
    expect(wrapper.find('#users-assigned .selected')).to.have.lengthOf(3);
  });

  it("removes usser assigned back to users available list", ()=>{
    editButton.simulate("click");
    wrapper.find("#users-available .user-item").at(0).simulate("click");
    wrapper.find("#users-available .user-item").at(1).simulate("click");
    wrapper.find(".add-user").simulate("click");
    wrapper.find("#users-assigned .user-item").at(0).simulate("click");
    wrapper.find(".remove-user").simulate("click");
    expect(wrapper.find("#users-available").html()).to.contain("Benjamin");
    expect(wrapper.find("#users-assigned").html()).to.not.contain("Benjamin");
    expect(wrapper.find("#users-assigned").html()).to.contain("Kailey");
  });

  it("member list shows assigned users", ()=>{
    editButton.simulate("click");
    let userItem = wrapper.find(".user-item").first();
    userItem.simulate("click");
    wrapper.find(".add-user").simulate("click");
    wrapper.find(".done-button").simulate("click");
    expect(wrapper.find(".header .count").text()).to.equal('1');
    expect(wrapper.find("#member-list li").length).to.equal(1);
    expect(wrapper.find("#member-list").html()).to.contain("Benjamin");
    expect(wrapper.find("#member-list").html()).to.not.contain("Kailey");
  });

  it("searcher filters members list", ()=>{
    editButton.simulate("click");
    wrapper.find(".user-item").at(0).simulate("click");
    wrapper.find(".user-item").at(1).simulate("click");
    wrapper.find(".add-user").simulate("click");
    wrapper.find(".done-button").simulate("click");
    expect(wrapper.find("#member-list li").length).to.equal(2);
    wrapper.find('.search-assigned').simulate('change', { target: { name: 'value', value: 'ben' } });
    expect(wrapper.find("#member-list li").length).to.equal(1);
    expect(wrapper.find("#member-list").html()).to.contain("Benjamin");
    expect(wrapper.find("#member-list").html()).to.not.contain("Kailey");
  });
});