import React from "react";
import { CardContent } from "@mui/material";
import { Button, Typography } from "@mui/material";

interface PrivacyPolicyModalProps {
  onClose: () => void;
}

const PrivacyPolicyModalItem: React.FC<PrivacyPolicyModalProps> = ({ onClose }) => {

    return (
        <CardContent>
            <Typography variant="h4" className="font-bold mb-4">
                プライバシーポリシー
            </Typography>
            <Typography variant="h5" className="font-bold mt-4 mb-2">
                はじめに
            </Typography>
            <Typography paragraph>
                当社は、Circusを利用するお客様に関する情報の保護について、次のとおりプライバシーポリシー（以下「本ポリシー」）を定め、本ポリシーに基づき、以下の通り取り扱います。
                なお、本ポリシーで使用する用語の意味は、個人情報の保護に関する法律（以下「個人情報保護法」）に準拠するものとします。
            </Typography>
            <Typography variant="h5" component="h2" className="font-bold mb-3">
                お客様から取得する情報
            </Typography>
            <Typography paragraph　component="h2" className="font-bold" style={{marginBottom:"0px"}}>
                ●団体に関する情報
            </Typography>
            <Typography paragraph>
                サークル名・団体名、学校名、メールアドレス、活動人数、活動場所、部費、写真や動画、SNSアカウント情報等
            </Typography>
            <Typography paragraph component="h2" className="font-bold" style={{ marginBottom: "0px" }}>
                ●サービスの利用に際して取得する情報
            </Typography>
            <Typography paragraph>
                外部サービスでお客様が利用するIDその他外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報、Cookie(クッキー)を用いて生成された識別情報、OSが生成するID・端末の種類・端末識別子等のお客様が利用するOSや端末に関する情報、当社ウェブサイトの滞在時間・入力履歴・購買履歴等の当社ウェブサイトにおけるお客様の行動履歴、当社アプリの利用履歴等
            </Typography>
            <Typography paragraph component="h2" className="font-bold" style={{ marginBottom: "0px" }}>
                ●その他の情報
            </Typography>
            <Typography paragraph>
                お客様から当社へのお問い合わせ・ご連絡等に関する情報等
            </Typography>
            <Typography variant="h5" className="font-bold mt-4 mb-2">
                お客様の情報を利用する目的
            </Typography>
            <Typography paragraph>
                当社は、お客様から取得した情報を、以下の目的のために利用します。
            </Typography>
            <li>当社サービスに関する登録の受付、お客様の本人確認、認証のため</li>
            <li> お客様の当社サービスの利用履歴を管理するため</li>
            <li> お客様の当社サービスの利用履歴を管理するため</li>
            <li> 当社サービスにおけるお客様の行動履歴を分析し、当社サービスの維持改善に役立てるため</li>
            <li> 広告の配信、表示及び効果測定のため</li>
            <li> 当社のサービスに関するご案内をするため</li>
            <li> 提携する事業者・サービスのご案内をお送りするため</li>
            <li> お客様からのお問い合わせに対応するため</li>
            <li> 当社の規約や法令に違反する行為に対応するため</li>
            <li> 当社サービスの変更、提供中止、終了、契約解除をご連絡するため</li>
            <li> 当社規約の変更等を通知するため</li>
            <li style={{marginBottom:"15px"}}> 以上の他、当社サービスの提供、維持、保護及び改善のため</li>
            <Typography variant="h5" className="font-bold mt-4 mb-2">
                安全管理のために講じた措置
            </Typography>
            <Typography paragraph>
                当社は、その取り扱う個人情報の漏えい、滅失又は毀損の防止その他個人情報の安全管理のために、必要かつ適切な措置を講じます。また、必要に応じ、措置の見直し・改善を継続的に行い、安全性の確保に努めます。
            </Typography>
            <Typography variant="h5" className="font-bold mt-4 mb-2">
                第三者提供
            </Typography>
            <Typography paragraph>
                当社は、お客様から取得する情報のうち、個人データ（個人情報保護法第１６条第３項）に該当するものついては、あらかじめお客様の同意を得ずに、第三者（日本国外にある者を含みます。）に提供しません。但し、次の場合は除きます。
            </Typography>
            <li>個人データの取扱いを外部に委託する場合</li>
            <li> 当社や当社サービスが買収された場合</li>
            <li> 事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）</li>
            <li style={{ marginBottom: "15px" }} > その他、法律によって合法的に第三者提供が許されている場合</li>
            <Typography variant="h5" className="font-bold mt-4 mb-2">
                アクセス解析ツール
            </Typography>
            <Typography paragraph>
                当社は、お客様のアクセス解析のために、「Googleアナリティクス」を利用しています。Googleアナリティクスは、トラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすれば、これらの情報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。Googleアナリティクスについて、詳しくは以下からご確認ください。
                <p>　https://marketingplatform.google.com/about/analytics/terms/jp/</p>
            </Typography>
            <Typography variant="h5" className="font-bold mt-4 mb-2">
                広告の配信
            </Typography>
            <Typography paragraph>
                当社は、Google及びそのパートナー（第三者配信事業者）の提供する広告を設置しています。広告配信にはCookieを使用し、お客様が過去に当社ウェブサイトやその他のサイトにアクセスした情報に基づいて広告を配信します。Google やそのパートナーは、Cookieを使用することにより適切な広告を表示しています。
                <p>お客様は、以下のGoogleアカウントの広告設定ページから、パーソナライズ広告を無効にできます</p>
                <p>　https://adssettings.google.com/u/0/authenticated</p>
                <p>　また aboutads.info のページにアクセスし、パーソナライズ広告掲載に使用される第三者配信事業者のCookieを無効にすることもできます。</p>
                <p>　その他、GoogleによるCookieの取り扱い詳細については、以下のGoogleのポリシーと規約のページをご覧ください。</p>
                <p>　https://policies.google.com/technologies/ads　</p>
            </Typography>
            <Typography variant="h5" className="font-bold mt-4 mb-2">
                プライバシーポリシーの変更
            </Typography>
            <Typography paragraph>
                当社は、必要に応じて、このプライバシーポリシーの内容を変更します。この場合、お客様に対し、変更後のプライバシーポリシーの施行時期と内容を適切な方法により周知または通知します。
            </Typography>
            <Typography variant="h5" className="font-bold mt-4 mb-2">
                開示等の請求
            </Typography>
            <Typography paragraph>
                <p>当社は、開示等の請求（利用目的の通知、個人情報又は第三者提供記録の開示、訂正・追加・削除、利用の停止・第三者提供の停止の請求をいいます。）をご希望の場合は、「＃＃お問い合わせ窓口」までお問い合わせください。
                    この場合、当社が指定する方法により、手続きを行うこととする。</p>
                <p>また、個人情報又は第三者提供記録の開示請求を行う場合、開示の有無に関わらず、ご申請後に当社が「＃＃お問い合わせ窓口」より指定する振込先に一件あたり1,000円の事務手数料をいただきます。</p>
            </Typography>
            <Typography variant="h5" className="font-bold mt-4 mb-2">
                問い合わせ窓口
            </Typography>
            <Typography paragraph>
                <p>ご意見、ご質問、苦情のお申出その他個人情報の取扱いに関するお問い合わせは、下記の窓口までご連絡ください。</p>
                <p>e-mail：circus.plat@gmail.com</p>
            </Typography>
            <div className="flex justify-center">
                <Button onClick={onClose} variant="contained" style={{ marginTop: "20px", width: "40%", fontSize: "20px" }} sx={{ paddingX: "30px", backgroundColor: "#4682A9" }} >
                    同意する
                </Button>
            </div>
        </CardContent>
    );
};

export default PrivacyPolicyModalItem;
