import { Avatar, Button, Chip, Container, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import React, { FC } from "react";
import BarGraph from "../components/shared/BarGraph";
import CircleIcon from '@mui/icons-material/Circle';
import '../styles/pages/CompanyPolicy.css';


const CompanyPolicy: FC = () => {

    return (
        <Container className="flex flex-col items-center w-[80%]">
            <Paper className="p-8 my-10">
                <Typography variant="h4" className="font-bold mb-4">
                    利用規約
                </Typography>
                <Typography paragraph>
                    Circus（以下、「甲」と呼ぶ）は、甲が運営する全てのサービス（以下「本サービス」と呼ぶ）を本サービスの利用者（以下、「乙」と呼ぶ）が利用することに関して以下の利用規約（以下、「本規約」とよぶ）を定め、乙は登録をもって本規約に同意したものとみなします。
                </Typography>
                <Typography variant="h5" className="font-bold mt-4 mb-2">
                    利用規約の範囲
                </Typography>
                <Typography paragraph>
                    本規約の適用範囲は、甲が運営する「Circus」ウェブサイトに規定するものに加え、甲が乙に対して電子メール等で発信する情報も含めます。
                </Typography>
                <Typography variant="h5" component="h2" className="font-bold mb-3">
                    登録
                </Typography>
                <Typography paragraph>
                    乙は本サービスの登録にあたって、下記の事項を確認し、これに同意したものとします。
                </Typography>
                <div className="list-container">
                    <div className="list-item">本規約を熟読し、その内容に同意したうえで、本サービスに登録すること。</div>
                    <div className="list-item">電子メールアドレス、パスワードその他の甲が定める項目について正確に真実の情報を登録すること。また、これらの情報を乙の責任で保管すること。</div>
                    <div className="list-item">乙の通信環境、コンピュータの設定等が本サービスの利用に支障がないことが確認できていること。</div>
                    <div className="list-item">乙が未成年の場合、親権者等の法定代理人の同意を得ていること。</div>
                </div>
                <Typography variant="h5" component="h2" className="font-bold mb-3">
                    禁止行為
                </Typography>
                <Typography paragraph>
                    1項　乙は本サービスの利用に際して以下の行為を禁止します。
                </Typography>
                <div className="list-container">
                    <div className="list-item">乙が本サービスを他者に利用させること、または本サービスを利用する権利を譲渡しもしくは担保に供する行為。</div>
                    <div className="list-item">甲の名誉、信用、著作権、肖像権等の知的財産権、プライバシーを侵害すること。</div>
                    <div className="list-item">違法行為、公序良俗に反する行為。</div>
                    <div className="list-item">本サービスの運用を妨げる行為。</div>
                    <div className="list-item">本サービスを連鎖販売取引・ネットワークビジネスの営業行為、勧誘行為、およびその準備に利用する行為。</div>
                    <div className="list-item">本サービスのほかの利用者が経済的・精神的損害、不利益を被る行為。</div>
                    <div className="list-item">過度に暴力的な表現、露骨な性的表現、児童ポルノ・児童虐待に相当する表現を、投稿または送信する行為。</div>
                    <div className="list-item">人種、国籍、信条、性別、社会的身分、門地等による差別につながる表現を、投稿または送信する行為。</div>
                    <div className="list-item">自殺、自傷行為、薬物乱用を誘引または助長する表現を、投稿または送信する行為。</div>
                    <div className="list-item">宗教活動または宗教団体への勧誘行為。</div>
                    <div className="list-item">性行為やわいせつな行為を目的とする行為。</div>
                    <div className="list-item">犯罪行為および犯罪行為に結びつく行為。</div>
                    <div className="list-item">他の利用者へのハラスメント行為。なお、ハラスメント行為は甲の判断により行えるものとする。</div>
                    <div className="list-item">甲のスタッフの雇用条件等、甲の開示していない機密情報を詮索する行為。</div>
                    <div className="list-item">スタッフの運営を妨げる行為。</div>
                    <div className="list-item">本サービスを通じて知りえた他会員の個人情報を、他へ流出する行為。</div>
                    <div className="list-item">掲載している内容やデータを、プログラム等を用いて機械的に取得する行為（スクレイピング等）。</div>
                    <div className="list-item">その他甲が不適当と判断する行為。</div>
                </div>
                <Typography paragraph>
                    2項　乙が前項に定めた行為を行った場合は、甲は直ちに乙の登録を取り消すことができることとします。
                </Typography>
                <Typography paragraph>
                    3項　他利用者が前項に定めた行為を行い、乙に損害が生じた場合、甲は乙に対し一切の責任を負わないこととします。
                </Typography>
                <Typography variant="h5" component="h2" className="font-bold mb-3">
                    登録の不承認・取り消し
                </Typography>
                <Typography paragraph>
                    乙が下記に定める事由に該当する場合、甲は乙による登録を承認しない場合もしくは登録後に取り消すことができます。
                </Typography>
                <div className="list-container">
                    <div className="list-item">乙が登録の際、甲が定める項目の全部または一部を登録しなかった場合。または、登録した情報に虚偽や誤記があった場合。</div>
                    <div className="list-item">乙が登録の際に登録した情報に変更があったにもかかわらず、変更手続きを行わなかった場合。</div>
                    <div className="list-item">乙が既に登録している場合。</div>
                    <div className="list-item">乙が過去に甲により登録を取り消されている場合。</div>
                    <div className="list-item">乙が未成年、成年被後見人、被保佐人、被補助人のいずれかであり、登録の際に保護者、法定後見人等の同意を得ていない場合。</div>
                    <div className="list-item">乙が連鎖販売取引・ネットワークビジネスの会員、メンバー等である場合。</div>
                    <div className="list-item">乙が禁止行為を行った場合。</div>
                    <div className="list-item">その他の事由で甲が不適切と判断した場合。</div>
                </div>
                <Typography variant="h5" component="h2" className="font-bold mb-3">
                    登録情報の変更
                </Typography>
                <Typography paragraph>
                    乙は甲に届けた登録情報の内容に変更があった場合、 遅滞なく登録情報の変更手続きをするものとします。 甲は乙が登録情報の変更を怠ったことにより生じた乙の不利益、 その他の負担に関して一切責任を負わないものとします。
                </Typography>
                <Typography variant="h5" component="h2" className="font-bold mb-3">
                    個人情報の取扱い
                </Typography>
                <Typography paragraph>
                    甲は乙が登録した個人情報を、個人情報保護法および甲が規定するプライバシーポリシーに則って管理するものとします。
                </Typography>
                <Typography variant="h5" component="h2" className="font-bold mb-3">
                    退会
                </Typography>
                <Typography paragraph>
                    乙は、退会手続きを所定の方法により行えます。
                </Typography>
                <Typography variant="h5" component="h2" className="font-bold mb-3">
                    本サービスの事業中断・終了
                </Typography>
                <Typography paragraph>
                    甲は、事前または事後にウェブサイトもしくは電子メールで通知したうえ、乙の了承なしに本サービスの中断または終了をすることができ、乙はこれにあらかじめ同意したものとみなされます。
                </Typography>
                <Typography variant="h5" component="h2" className="font-bold mb-3">
                    サービス規定
                </Typography>
                <Typography paragraph>
                    乙は、次の各サービス規定にあらかじめ同意し、従うものとします。
                </Typography>
                <div className="list-container">
                    <div className="list-item">乙が、本サービスを利用するには会員登録をする必要があります。本サービスを利用することで、ログイン後の各種機能を利用できます。</div>
                    <div className="list-item">メールやLINE機能などを通じ、他利用者から送られてきたファイルやサークルブック以外のURLを開くときは、ユーザーの自己責任で開くものとします。他利用者から送られてきたファイル・URLが原因となってウィルス感染などの損害が発生した場合でも、甲は一切責任を負わないこととします。</div>
                </div>
                <Typography variant="h5" component="h2" className="font-bold mb-3">
                    賠償責任
                </Typography>
                <Typography paragraph>
                    乙は下記に定める事項に起因または関連して生じた一切の損害について、甲が賠償責任を負わないことに同意します。
                </Typography>
                <div className="list-container">
                    <div className="list-item">本サービスを利用したこと、または利用ができなかったこと</div>
                    <div className="list-item">乙の送信やデータへの不正アクセスや不正な改変がなされたこと</div>
                    <div className="list-item">本サービス中の第三者による発言、送信や行為</div>
                    <div className="list-item">本サービスに投稿した内容が甲により削除・変更等されたこと</div>
                    <div className="list-item">その他サービスに関連する事項</div>
                </div>
                <Typography variant="h5" component="h2" className="font-bold mb-3">
                    知的財産権
                </Typography>
                <Typography paragraph>
                    本サービスに関する商標権、著作権その他一切の知的財産権は全て甲に帰属するものとし、これらを乙が甲に無断で使用することを禁止します。
                </Typography>
                <Typography variant="h5" component="h2" className="font-bold mb-3">
                    削除権限
                </Typography>
                <Typography paragraph>
                    甲は、弊社が不適切と判断する場合には、投稿内容の違法性・規約違反の有無に関わらず、関連する投稿についてその全部もしくは一部の削除又は公開範囲の変更等の措置を行うことができるものとします。
                </Typography>
                <Typography variant="h5" component="h2" className="font-bold mb-3">
                    本規約の変更
                </Typography>
                <Typography paragraph>
                    甲は乙の了承を得ることなく本規約を変更することができるものとします。変更後の本規約は甲のウェブサイト上にアップロードされた時点で効力を生じるものとし、乙はその効力をあらかじめ承諾したものとみなされます。
                </Typography>
                <Typography variant="h5" component="h2" className="font-bold mb-3">
                    準拠法および専属的合意管轄裁判所
                </Typography>
                <Typography paragraph>
                    本規約は日本法に準拠し、同法に従って解釈されるものとします。また、本サービスまたは本規約に関連して甲と乙の間で生じた紛争については東京地方裁判所を第一審の専属的合意管轄裁判所とします。
                </Typography>
                <Typography paragraph>
                    付則　2024年2月24日　制定・施行
                </Typography>
            </Paper>
        </Container>
    );
};

export default CompanyPolicy;