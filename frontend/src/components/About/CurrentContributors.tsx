import React, { FC } from 'react';
import { Row, Col } from 'react-bootstrap';

import { H3, Themed } from 'bt/custom';

import { ReactComponent as Web } from 'assets/svg/about/web.svg'

import annie_1 from 'assets/img/about/2020-21/annie_1.jpg';
import annie_2 from 'assets/img/about/2020-21/annie_2.jpg';
import austin_1 from 'assets/img/about/2020-21/austin_1.jpg';
import austin_2 from 'assets/img/about/2020-21/austin_2.jpg';
import chris_1 from 'assets/img/about/2020-21/chris_1.jpg';
import chris_2 from 'assets/img/about/2020-21/chris_2.jpg';
import christina_1 from 'assets/img/about/2020-21/christina_1.jpg';
import christina_2 from 'assets/img/about/2020-21/christina_2.jpg';
import grace_1 from 'assets/img/about/2020-21/grace_1.jpg';
import grace_2 from 'assets/img/about/2020-21/grace_2.jpg';
import hannah_1 from 'assets/img/about/2020-21/hannah_1.jpg';
import hannah_2 from 'assets/img/about/2020-21/hannah_2.jpg';
import hiroshi_1 from 'assets/img/about/2020-21/hiroshi_1.jpg';
import hiroshi_2 from 'assets/img/about/2020-21/hiroshi_2.jpg';
import jonathan_1 from 'assets/img/about/2020-21/jonathan_1.jpg';
import jonathan_2 from 'assets/img/about/2020-21/jonathan_2.jpg';
import junghyun_1 from 'assets/img/about/2020-21/junghyun_1.jpg';
import junghyun_2 from 'assets/img/about/2020-21/junghyun_2.jpg';
import kevin_1 from 'assets/img/about/2020-21/kevin_1.jpg';
import kevin_2 from 'assets/img/about/2020-21/kevin_2.jpg';
import leon_1 from 'assets/img/about/2020-21/leon_1.jpg';
import leon_2 from 'assets/img/about/2020-21/leon_2.jpg';
import shuming_1 from 'assets/img/about/2020-21/shuming_1.jpg';
import shuming_2 from 'assets/img/about/2020-21/shuming_2.jpg';
import vihan_1 from 'assets/img/about/2020-21/vihan_1.jpg';
import vihan_2 from 'assets/img/about/2020-21/vihan_1.jpg';
import oski from 'assets/img/images/oski.jpg';

const contributors = [
  [
    {
      name: 'Grace Luo',
      role: (
        <>
          ASUC CTO
          <br />
          Product Manager
        </>
      ),
      site: 'https://graceluo.me',
      img: grace_1,
      silly_img: grace_2,
    },
    {
      name: 'Christopher Liu',
      role: (
        <>
          Product Manager
          <br />
          Frontend Lead
        </>
      ),
      site: 'https://chrisdliu.github.io',
      img: chris_1,
      silly_img: chris_2,
    },
    {
      name: 'Leon Ming',
      role: 'Backend Lead',
      site: 'https://leon-ming.com',
      img: leon_1,
      silly_img: leon_2,
    },
    {
      name: 'Annie Pan',
      role: (
        <>
          Design Lead
          <br />
          Marketing Director
        </>
      ),
      site: 'https://anniexpan.com',
      img: annie_1,
      silly_img: annie_2,
    },
  ],
  [
    {
      name: 'Hiroshi Usui',
      role: 'Infrastructure Engineer',
      site: '',
      img: hiroshi_1,
      silly_img: hiroshi_2,
    },
    {
      name: 'Jonathan Pan',
      role: 'Backend Engineer',
      site: 'https://www.linkedin.com/in/jonathan-pan',
      img: jonathan_1,
      silly_img: jonathan_2,
    },
    {
      name: 'Shuming Xu',
      role: 'Backend Engineer',
      site: 'https://shumingxu.com/',
      img: shuming_1,
      silly_img: shuming_2,
    },
    {
      name: 'Kevin Wang',
      role: 'Backend Engineer',
      site: 'https://kevwang.dev/',
      img: kevin_1,
      silly_img: kevin_2,
    },
  ],
  [
    {
      name: 'Hannah Yan',
      role: 'Designer',
      site: 'https://www.linkedin.com/in/yanhannah',
      img: hannah_1,
      silly_img: hannah_2,
    },
    {
      name: 'Junghyun Choy',
      role: 'Designer',
      site: '',
      img: junghyun_1,
      silly_img: junghyun_2,
    },
    {
      name: 'Danji Liu',
      role: 'Designer',
      site: 'https://danjiliu.com/',
      img: oski,
      silly_img: oski,
    },
    {
      name: 'Christina Shao',
      role: 'Frontend Engineer',
      site: 'https://christinashao.github.io/',
      img: christina_1,
      silly_img: christina_2,
    },
  ],
  [
    {
      name: 'Austin George',
      role: 'Frontend Engineer',
      site: '',
      img: austin_1,
      silly_img: austin_2,
    },
    {
      name: 'Vihan Bhargava',
      role: 'Frontend Engineer',
      site: 'https://vihan.org',
      img: vihan_1,
      silly_img: vihan_2,
    },
  ],
];

const CurrentContributors: FC = () => (
  <div className="current-contributors mb-5">
    <H3 bold className="mb-4">
      <Themed light={<>Current Team</>} stanfurd={<>Unpaid UC Berkeley Interns</>}/>
    </H3>
    {contributors.map((row, i) => (
      <Row key={i}>
        {row.map((member) => (
          <Col key={member.name} xs={6} md={3} className="contributor-card">
            <div className="headshot">
              <img className="serious" src={member.img} alt={member.name} />
              <img src={member.silly_img} alt={member.name} />
            </div>
            <div className="name">
              <p className="bt-light-bold">{member.name}</p>
              {member.site ? (
                <a href={member.site}>
                  <Web />
                </a>
              ) : null}
            </div>
            <div className="role">{member.role}</div>
          </Col>
        ))}
      </Row>
    ))}
  </div>
);

export default CurrentContributors;
