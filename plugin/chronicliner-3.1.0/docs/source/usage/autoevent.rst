========================================
自動追加カード
========================================

:doc:`../data/character` で設定されたキャラクターの :ref:`birthday` 、 :ref:`deathday` により、キャラクターの誕生日イベント、及び死亡イベントのカードが自動で追加されます。

また、各年のイベント設定に応じ、サマリーカードが自動で追加されます。このカードは年表で該当年を折りたたんでいる場合にのみ表示されます。

.. _birthdayEvent:

1. 誕生日イベント
========================================
キャラクターの誕生日設定に応じて自動で追加されます。イベントの設定値は以下の通りです。

.. csv-table::
    :header: "カラム名", "設定値"

    ":ref:`categoryE`", "``{キャラクタ名}``"
    ":ref:`title`", "``{キャラクタ名}誕生``"
    ":ref:`date`", "``{キャラクターの誕生日}``"
    ":ref:`limit`", "``hour``"
    ":ref:`beforeAfter`", "``(空欄)``"
    ":ref:`detail`", ":doc:`../data/character` で設定された誕生日イベント詳細"

.. _deathdayEvent:

2. 死亡イベント
===============================
キャラクターの死亡日が設定されている場合、自動で追加されます。イベントの設定値は以下の通りです。

.. csv-table::
    :header: "カラム名", "設定値"

    ":ref:`categoryE`", "``{キャラクタ名}``"
    ":ref:`title`", "``{キャラクタ名}死亡``"
    ":ref:`date`", "``{キャラクターの死亡日}``"
    ":ref:`limit`", "``hour``"
    ":ref:`beforeAfter`", "``(空欄)``"
    ":ref:`detail`", ":doc:`../data/character` で設定された死亡日イベント詳細"

.. _periodStartEvent:

3. 期間イベント開始イベント
===============================
期間イベントが存在する場合、自動で追加されます。イベントの設定値は以下の通りです。

.. csv-table::
    :header: "カラム名", "設定値"

    ":ref:`categoryE`", ":doc:`../data/periodEvent` で設定されたカテゴリ"
    ":ref:`title`", ":doc:`../data/periodEvent` で設定されたイベントタイトル"
    ":ref:`date`", ":doc:`../data/periodEvent` で設定された開始日時"
    ":ref:`limit`", ":doc:`../data/periodEvent` で設定された以下を無視"
    ":ref:`beforeAfter`", "``期間``"
    ":ref:`detail`", ":doc:`../data/periodEvent` で設定された開始時詳細"
    ":ref:`tagEVPeriod`", ":doc:`../data/periodEvent` で設定されたタグ"

.. _periodEndEvent:

4. 期間イベント終了イベント
===============================
期間イベントが存在する場合、自動で追加されます。イベントの設定値は以下の通りです。

.. csv-table::
    :header: "カラム名", "設定値"

    ":ref:`categoryE`", ":doc:`../data/periodEvent` で設定されたカテゴリ"
    ":ref:`title`", ":doc:`../data/periodEvent` で設定されたイベントタイトル"
    ":ref:`date`", ":doc:`../data/periodEvent` で設定された終了日時"
    ":ref:`limit`", ":doc:`../data/periodEvent` で設定された以下を無視"
    ":ref:`beforeAfter`", "``期間``"
    ":ref:`detail`", ":doc:`../data/periodEvent` で設定された終了時詳細"
    ":ref:`tagEVPeriod`", ":doc:`../data/periodEvent` で設定されたタグ"

.. _flagStartEvent:

5. フラグ回収期間開始イベント
===============================
フラグ型期間イベントが存在する場合、自動で追加されます。イベントの設定値は以下の通りです。

.. csv-table::
    :header: "カラム名", "設定値"

    ":ref:`categoryE`", ":doc:`../data/periodEvent` で設定されたカテゴリ"
    ":ref:`title`", ":doc:`../data/periodEvent` で設定されたイベントタイトル"
    ":ref:`date`", ":doc:`../data/periodEvent` で設定された開始日時"
    ":ref:`limit`", ":doc:`../data/periodEvent` で設定された以下を無視"
    ":ref:`beforeAfter`", "``フラグ``"
    ":ref:`detail`", ":doc:`../data/periodEvent` で設定された開始時詳細"
    ":ref:`tagEVPeriod`", ":doc:`../data/periodEvent` で設定されたタグ"

.. _flagEndEvent:

6. フラグ回収期間終了イベント
===============================
期間イベントが存在する場合、自動で追加されます。イベントの設定値は以下の通りです。

ただし、該当のキャラクターが期間内にフラグを回収した場合は表示されません。

.. csv-table::
    :header: "カラム名", "設定値"

    ":ref:`categoryE`", ":doc:`../data/periodEvent` で設定されたカテゴリ"
    ":ref:`title`", ":doc:`../data/periodEvent` で設定されたイベントタイトル"
    ":ref:`date`", ":doc:`../data/periodEvent` で設定された終了日時"
    ":ref:`limit`", ":doc:`../data/periodEvent` で設定された以下を無視"
    ":ref:`beforeAfter`", "``フラグ``"
    ":ref:`detail`", ":doc:`../data/periodEvent` で設定された終了時詳細"
    ":ref:`tagEVPeriod`", ":doc:`../data/periodEvent` で設定されたタグ"


7. サマリー
===============================
データ読み込み時に自動で追加され、年折りたたみ時に表示されます。
また、表示年範囲を制限している場合、制限対象の年のイベント数を集計して表示します。

内部ではイベントと同様に処理されており、設定値は以下の通りです。

.. csv-table::
    :header: "カラム名", "設定値"

    ":ref:`categoryE`", "``summary``"
    ":ref:`title`", "カテゴリ別イベント件数サマリー"
    ":ref:`date`", "``{該当年}/12/31 23:59``"
    ":ref:`limit`", "``minute``"
    ":ref:`beforeAfter`", "``(空欄)``"
    ":ref:`detail`", "``(空欄)``"

.. note::
    サマリーカードには月、日、時間は表示されません

.. note::
    サマリーカードのカテゴリ別イベント件数には、キャラクターの :ref:`誕生日イベント<birthdayEvent>` 及び :ref:`死亡イベント<deathdayEvent>` :ref:`期間イベント開始イベント<periodStartEvent>` 、:ref:`期間イベント終了イベント<periodEndEvent>` が含まれます

.. note::
    年範囲制限時、非表示年のイベント数を集計したカードが年表の先頭と末尾に追加されます。ただし、表示開始年が最古のイベントの年に一致しているときは先頭、表示終了年が最新のイベントの年に一致しているときは末尾のカードが表示されません。