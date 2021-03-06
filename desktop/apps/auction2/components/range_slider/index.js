import { formatMoney } from 'accounting'
import { updateEstimateRange, updateEstimateDisplay } from '../../actions'
import Slider, { Range } from 'rc-slider'
import React from 'react'
import { connect } from 'react-redux'

function RangeSlider(props) {
  const {
    currency,
    filterParams,
    minEstimateRangeDisplay,
    maxEstimateRangeDisplay,
    updateEstimateRangeAction,
    updateEstimateDisplayAction
  } = props

  const minEstimate = filterParams.ranges.estimate_range.min
  const maxEstimate = filterParams.ranges.estimate_range.max
  const formattedMinDisplay = formatMoney(minEstimateRangeDisplay, { symbol: currency, precision: 0 })
  const formattedMaxDisplay = formatMoney(maxEstimateRangeDisplay, { symbol: '', precision: 0 })
  return (
    <div className='auction2-range-slider'>
      <div className='auction2-range-slider__metadata'>
        <div className='auction2-range-slider__title'>Price</div>
        <div className='auction2-range-slider__caption'>{`${formattedMinDisplay} - ${formattedMaxDisplay}+`}</div>
      </div>
      <Range
        allowCross={false}
        min={minEstimate}
        max={maxEstimate}
        step={50}
        defaultValue={[minEstimateRangeDisplay, maxEstimateRangeDisplay]}
        onChange={([min, max]) => updateEstimateDisplayAction(min, max)}
        onAfterChange={([min, max]) => updateEstimateRangeAction(min, max)}
      />
      <div className='auction2-range-slider__info'>Based on the estimate for the lot</div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currency: state.auctionArtworks.currency,
    filterParams: state.auctionArtworks.filterParams,
    minEstimateRangeDisplay: state.auctionArtworks.minEstimateRangeDisplay,
    maxEstimateRangeDisplay: state.auctionArtworks.maxEstimateRangeDisplay
  }
}

const mapDispatchToProps = {
  updateEstimateRangeAction: updateEstimateRange,
  updateEstimateDisplayAction: updateEstimateDisplay
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RangeSlider)
