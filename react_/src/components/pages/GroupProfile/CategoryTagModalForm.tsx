import React, { useState } from 'react';
import { Box, Typography, Button } from "@mui/material";
import { useAppSelector } from '../../../redux/config/hooks';
import { selectGroupInfo } from '../../../redux/groupInfoSlice';
import { updateGroupCategory } from '../../../services/firebase/Firestore/firestore';

const CategoryTagModalForm = ({ onClose }) => {
    const groupInfo = useAppSelector(selectGroupInfo);
    // 複数選択可能なカテゴリーの初期状態を配列で管理
    interface SelectedTags {
        [key: string]: string[];
    }

    // 複数選択可能なカテゴリーの初期状態をgroupInfoから取得して設定
    const [selectedTags, setSelectedTags] = useState({
        activityStyleTags: groupInfo.activityStyleTags || [],
        activityLocationTags: groupInfo.activityLocationTags || [],
        genreTags: groupInfo.genreTags || [],
    });

    // その他のカテゴリーは単一選択（文字列で管理）で、groupInfoから初期値を設定
    const [memberCountTag, setMemberCountTag] = useState(groupInfo.memberCountTag || '');
    const [activityFrequencyTag, setActivityFrequency] = useState(groupInfo.activityFrequencyTag || '');

    // 複数選択可能なカテゴリーの選択状態を更新
    const handleSelectMultipleTag = (category, tag) => {
        setSelectedTags(prevState => {
            const currentTags = prevState[category];
            if (currentTags.includes(tag)) {
                return { ...prevState, [category]: currentTags.filter(t => t !== tag) };
            } else {
                return { ...prevState, [category]: [...currentTags, tag] };
            }
        });
    };
    // formDataを準備
    const prepareCategoryData = () => {
        return {
            id: groupInfo.id,
            activityStyleTags: selectedTags.activityStyleTags,
            activityLocationTags: selectedTags.activityLocationTags,
            genreTags: selectedTags.genreTags,
            memberCountTag, // 単一選択の状態を追加
            activityFrequencyTag, // 単一選択の状態を追加
        };
    };

    const handleSubmit = async (event)=>{
        event.preventDefault(); 
        const CategoryData = prepareCategoryData();
        await updateGroupCategory(CategoryData).then(() =>
            location.replace("/")
        );
        onClose(false); // モーダルを閉じる
        console.log(CategoryData);
    }

    // 単一選択のカテゴリーの選択状態を更新
    const handleSelectSingleTag = (setter, tag) => {
        setter(tag);
    };

    // カテゴリとタグのリスト
    const categories = {
        activityStyleTags: ['公認', '非公認', 'インカレ'],
        activityLocationTags: ['今出川', '京田辺', 'その他'],
        memberCount: ['50人以上', '20~49人', '20人未満'],
        activityFrequency: ['月3未満', '週1', '週3以上'],
        genreTags: [
            'スポーツ', 'アルティメット', 'ウィンタースポーツ', 'カバディ', '空手', '筋トレ', '剣道', 'ゴルフ', 'サッカー', '水泳', 'スキー', 'スノボ', 'ソフトボール', 'ダイビング', '卓球', 'テコンドー', '硬式テニス', '軟式テニス', 'バスケ', 'バドミントン', 'バレーボール', 'ハンドボール', 'フットサル', 'プロレス', 'ボルダリング', 'マイナースポーツ', 'マリンスポーツ', 'モルック', '野球', 'ヨット', 'ラグビー', '陸上',
            'アウトドア', '釣り', 'ハイキング', 'グランピング', '登山', 'サイクリング', '散策','ヨガ','スポーツ観戦','メディア', '広告', '新聞', 'テレビ', 'ラジオ・放送局','イベント・交流', '運営・企画',
            'ゲーム','プログラミング','芸術', 'アート', '演劇', '小説', '書道', '陶芸', '服飾', '文芸', '漫画','映画','写真','伝統','研究','同好会','歴史','料理','食べる','天文','ものづくり','ビジコン','ボランティア', '子ども', '国際交流', '社会問題','手話','音楽', '軽音', '合唱', '器楽','ダンス','ダブルダッチ','よさこい','マジック','ジャグリング','應援團',
            '委員会','神学部', '文学部', '社会学部', '法学部', '経済学部', '商学部', '政策学部', '文化情報学部', '理工学部', '生命医科学部', 'スポーツ健康科学部', '心理学部', 'グローバル・コミュニケーション学部', 'グローバル・地域文化学部',
        ]

    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                タグを登録することでキーワード検索で見つけられやすくなります。
            </Typography>
            {Object.entries(categories).map(([category, tags]) => (
                <Box key={category} sx={{ my: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        {
                        category === 'activityStyleTags' ? '活動頻度' :
                        category === 'activityLocationTags' ? '活動場所': 
                        category === 'memberCount' ? '活動人数': 
                        category === 'activityFrequency' ? '活動頻度': 
                        category === 'genreTags' ? 'ジャンル': category
                        }
                    </Typography>
                    <div className="flex flex-wrap space-x-2">
                        {tags.map((tag) => (
                            <Button
                                key={tag}
                                variant={
                                    category === 'activityStyleTags' || category === 'activityLocationTags' || category === 'genreTags'
                                        ? selectedTags[category].includes(tag) ? "contained" : "outlined"
                                        : category === 'memberCount' && memberCountTag === tag || category === 'activityFrequency' && activityFrequencyTag === tag
                                            ? "contained" : "outlined"
                                }
                                onClick={() =>
                                    category === 'activityStyleTags' || category === 'activityLocationTags' || category === 'genreTags'
                                        ? handleSelectMultipleTag(category, tag)
                                        : category === 'memberCount'
                                            ? handleSelectSingleTag(setMemberCountTag, tag)
                                            : handleSelectSingleTag(setActivityFrequency, tag)
                                }
                                sx={{
                                    margin:"5px",
                                    bgcolor:
                                        category === 'activityStyleTags' || category === 'activityLocationTags' || category === 'genreTags'
                                            ? selectedTags[category].includes(tag) ? 'primary.main' : ''
                                            : category === 'memberCount' && memberCountTag === tag || category === 'activityFrequency' && activityFrequencyTag === tag
                                                ? 'primary.main' : '',
                                    '&:hover': {
                                        bgcolor: 'primary.dark',
                                    },
                                }}
                                className={`${category === 'activityStyleTags' || category === 'activityLocationTags' || category === 'genreTags'
                                        ? selectedTags[category].includes(tag) ? 'text-white' : 'text-primary'
                                    : category === 'memberCount' && memberCountTag === tag || category === 'activityFrequency' && activityFrequencyTag === tag
                                            ? 'text-white' : 'text-primary'
                                    } transition-colors duration-300`}
                            >
                                {tag}
                            </Button>
                        ))}
                    </div>
                </Box>
            ))}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#4682A9" }}
                onSubmit={handleSubmit}
            >
                登録(公開)
            </Button>
        </Box>
    );
};

export default CategoryTagModalForm;
