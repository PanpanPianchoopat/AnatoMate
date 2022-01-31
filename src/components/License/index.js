import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { Footer, LicenseLink } from "./styled";
import { useRouter } from "next/router";

const License = () => {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const [textColor, setTextColor] = useState("black");

  useEffect(() => {
    if (router.pathname == "/signup" || router.pathname == "/login") {
      setTextColor("white");
    } else {
      setTextColor("black");
    }
  }, [router.pathname]);

  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <Footer style={{ color: textColor }}>
      {showPopup && (
        <Modal
          visible={showPopup}
          onCancel={() => handleCancel()}
          footer={null}
          width={800}
        >
          <p>
            <b>License Agreement</b>
          </p>
          <p style={{ textAlign: "justify" }}>
            &emsp;ซอฟต์แวร์นี้เป็นผลงานที่พัฒนาขึ้นโดย นายชัชพล สุกิจพรอุดม
            นางสาวพลอยปภัส เพียรชูพัฒน์ และ นางสาวนาราภัทร โมระกรานต์ (สมาชิกทีม
            Acarium) จากสถาบันเทคโนโลยีพระจอมเกล้าธนบุรี ภายใต้การดูแลของ
            นายนันทิพัฒน์ นาคทอง ภายใต้โครงการ
            เว็บไซต์วิเคราะห์ภาพวาดตามหลักกายวิภาคเพื่อเป็นแนวทางในการแก้ไขภาพวาด
            (Anatomate) ซึ่งสนับสนุนโดย
            สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ
            โดยมีวัตถุประสงค์เพื่อส่งเสริมให้นักเรียนและนักศึกษาได้เรียนรู้และฝึกทักษะในการพัฒนาซอฟต์แวร์
            ลิขสิทธิ์ของซอฟต์แวร์นี้จึงเป็นของผู้พัฒนา
            ซึ่งผู้พัฒนาได้อนุญาตให้สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติเผยแพร่ซอฟต์แวร์นี้ตาม
            “ต้นฉบับ” โดยไม่มีการแก้ไขดัดแปลงใดๆ ทั้งสิ้น
            ให้แก่บุคคลทั่วไปได้ใช้เพื่อประโยชน์ส่วนบุคคลหรือประโยชน์ทางการศึกษาที่ไม่มีวุตถุประสงค์ในเชิงพาณิชย์
            โดยไม่คิดค่าตอบแทนการใช้ซอฟต์แวร์ ดังนั้น
            สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ
            จึงไม่มีหน้าที่ในการดูแล บำรุงรักษา จัดการอบรมการใช้งาน
            หรือพัฒนาประสิทธิภาพซอฟต์แวร์
            รวมทั้งไม่รับรองความถูกต้องหรือประสิทธิภาพการทำงานของซอฟต์แวร์
            ตลอดจนไม่รับประกันความเสียหายต่างๆ
            อันเกิดจากการใช้ซอฟต์แวร์นี้ทั้งสิ้น <br />
            &emsp;This software is a work developed by Mr. Chatchapon
            Sukitporn-udom, Miss Ploypapas Pianchoopat, and Miss Narapathra
            Morakrant (members of Acarium) from King Mongkut&apos;s University
            of Technology Thonburi under the provision of Mr. Nuntipat Narkthong
            under Web-based application to analyze drawings according to anatomy
            principles (Anatomate), which has been supported by the National
            Science and Technology Development Agency (NSTDA) , in order to
            encourage pupils and students to learn and practice their skills in
            developing software. Therefore, the intellectual property of this
            software shall belong to the developer and the developer gives NSTDA
            a permission to distribute this software as an “as is” and
            non-modified software for a temporary and non-exclusive use without
            remuneration to anyone for his or her own purpose or academic
            purpose, which are not commercial purposes. In this connection,
            NSTDA shall not be responsible to the user for taking care,
            maintaining, training or developing the efficiency of this software.
            Moreover, NSTDA shall not be liable for any error, software
            efficiency and damages in connection with or arising out of the use
            of the software.
          </p>
        </Modal>
      )}
      <p>Developed by Acarium &ensp; &#183; &ensp;</p>
      <LicenseLink onClick={() => setShowPopup(true)}>
        License Agreement
      </LicenseLink>
    </Footer>
  );
};

export default License;
