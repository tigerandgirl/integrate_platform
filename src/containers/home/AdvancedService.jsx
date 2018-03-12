import React, { Component, PropTypes } from 'react'
import Table from '@/components/home/Table.jsx'

export class AdvancedService extends Component {
  render() {
    return (
      <div>
       <Table title={'高级服务配置'} number={3} />
      </div>
    )
  }
}

export default AdvancedService
