/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useState } from "react";
import { Select, Spin } from "antd";
import { getPlaceNameAndCoordinates } from "../../../lib/getPlaceNameAndCoordinates";

const PlaceSearch = ({ setMapData }: { setMapData: any }) => {
    const [options, setOptions] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (value: string) => {
        if (!value) return;
        setLoading(true);
        const result = await getPlaceNameAndCoordinates(value);
        setLoading(false);

        if (result) {
            setOptions([
                {
                    value: JSON.stringify(result),
                    label: result.name
                }
            ]);
        }
    };

    const handleSelect = (value: string) => {
        const place = JSON.parse(value);
        console.log(place)
        if (!place) {
            return false
        }
        setMapData({
            latitude: place?.latitude,
            longitude: place?.longitude
        })
    };

    return (
        <div>
            <Select
                size="large"
                showSearch
                allowClear
                onClear={() => {
                    setMapData({
                        latitude: 0,
                        longitude: 0
                    })
                }}
                placeholder="Search a place"
                style={{ width: "100%" }}
                onSearch={handleSearch}
                onSelect={handleSelect}
                filterOption={false}
                notFoundContent={loading ? <Spin size="small" /> : null}
                options={options}
            />
        </div>
    );
};

export default memo(PlaceSearch);
