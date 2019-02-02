import { Quaternion, Euler, Vector3 } from "three";
import formatNumber from './formatNumber';

let infoBox;
const infoEuler = new Euler();
const infoQuaternion = new Quaternion();
const infoQuaternion2 = new Quaternion();
const infoVector = new Vector3(0,1,0);
const infoVector2 = new Vector3(0,1,0);

const updateInfoBox = ({alpha, beta, gamma}) => {

    if(!infoBox) {
        infoBox  = document.getElementById('info');
    }

    infoEuler.set(beta, alpha, -gamma, 'YXZ');
    infoQuaternion.setFromEuler(infoEuler);
    infoVector.set(0,1,0);
    infoVector.applyQuaternion(infoQuaternion);

    /*
    http://www.opengl-tutorial.org/intermediate-tutorials/tutorial-17-quaternions/#foreword-rotation-vs-orientation
    w = cos(RotationAngle / 2)
    x = RotationAxis.x * sin(RotationAngle / 2)
    y = RotationAxis.y * sin(RotationAngle / 2)
    z = RotationAxis.z * sin(RotationAngle / 2)
    */

   const RotationAngle = 2 * Math.acos(infoQuaternion.w),
         RotationAngleSin = Math.sin(RotationAngle/2),
         RotationAxis_x = infoQuaternion.x / RotationAngleSin,
         RotationAxis_y = infoQuaternion.y / RotationAngleSin,
         RotationAxis_z = infoQuaternion.z / RotationAngleSin;

    infoBox.innerHTML = `alpha:${formatNumber(alpha)} euler.y:${formatNumber(infoEuler.y)}<br/>
                         beta:${formatNumber(beta)} euler.x:${formatNumber(infoEuler.x)}<br/>
                         gamma:${formatNumber(gamma)} euler.z:${formatNumber(infoEuler.z)}<br/>
                         q.x:${formatNumber(infoQuaternion.x)}<br/>
                         q.y:${formatNumber(infoQuaternion.y)}<br/>
                         q.z:${formatNumber(infoQuaternion.z)}<br/>
                         q.w:${formatNumber(infoQuaternion.w)}<br/>
                         RotationAngle:${formatNumber(RotationAngle)}<br/>
                         RotationAxis_x:${formatNumber(RotationAxis_x)}<br/>
                         RotationAxis_y:${formatNumber(RotationAxis_y)}<br/>
                         RotationAxis_z:${formatNumber(RotationAxis_z)}<br/>
                         vector.x:${formatNumber(infoVector.x)}<br/>
                         vector.y:${formatNumber(infoVector.y)}<br/>
                         vector.z:${formatNumber(infoVector.z)}<br/>
                         `;

}

export default updateInfoBox;