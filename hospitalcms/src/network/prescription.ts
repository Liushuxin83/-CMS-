import { request } from '../network/request'
// 获取处方数据 api接口
export function getPrescriptionData (pageNum: number, pageSize: number) {
  return request({
    method: 'POST',
    url: '/prescriptionform',
    data: {
      pageNum,
      pageSize
    }
  })
}
// 添加处方数据接口
interface AddPrescription {
  prescriptionNumber: number | null
  clinicCardNumber: number | null
  treatmentdepartment: number | null
  clinicalDiagnosis: Array<string>
  doctor: string | null
  drugAmount: number | null
}
export function addPrescriptions (datas: AddPrescription) {
  return request({
    method: 'POST',
    url: '/addprescription',
    data: {
      prescription_number: datas.prescriptionNumber,
      clinic_card_number: datas.clinicCardNumber,
      treatmentdepartment: datas.treatmentdepartment,
      clinical_diagnosis: datas.clinicalDiagnosis,
      doctor: datas.doctor,
      drug_amount: datas.drugAmount
    }
  })
}
// 删除处方
export function deletePrescription (id: number) {
  return request({
    method: 'POST',
    url: '/deleteprescription',
    data: {
      prescription_number: id
    }
  })
}
// 更新处方
interface UpdatePrescription {
  prescriptionNumber: number | null
  treatmentdepartment: number | null
  clinicalDiagnosis: Array<string>
  doctor: string | null
  drugAmount: number | null
}
export function updatePrescription (data: UpdatePrescription) {
  return request({
    method: 'POST',
    url: '/updateprescription',
    data: {
      prescription_number: data.prescriptionNumber,
      treatmentdepartment: data.treatmentdepartment,
      clinical_diagnosis: data.clinicalDiagnosis,
      doctor: data.doctor,
      drug_amount: data.drugAmount
    }
  })
}
// 查询处方
export function queryPrescription (
  pageNum: number,
  pageSize: number,
  query: string
) {
  return request({
    method: 'POST',
    url: '/prescriptionform',
    data: {
      pageNum,
      pageSize,
      query
    }
  })
}
